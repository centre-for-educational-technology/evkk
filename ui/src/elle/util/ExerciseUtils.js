export const extractId = (link) => {
  const match = link.match(/\/node\/(\d+)/);
  return match ? match[1] : null;
};

export const validateLink = async (link) => {
  // quick local parse
  const externalId = extractId(link);
  if (!externalId) {
    return { status: 'error', externalId: null };
  }


  // host‐check
  try {
    const url = new URL(link);
    if (url.hostname !== 'sisuloome.e-koolikott.ee') {
      return { status: 'error', externalId: null };
    }
  } catch {
    return { status: 'error', externalId: null };
  }


  // doing a direct fetch and catch *all* errors here
  try {
    const res = await fetch('/api/exercises/validate-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link }),
    });
    if (!res.ok) {
      // HTTP 400/500 → invalid link
      return { status: 'error', externalId: null };
    }

    const payload = await res.json();
    switch (payload.status) {
      case 'ok':
        return { status: 'success', externalId: payload.external_id };
      case 'EXERCISE_ALREADY_EXISTS':
        return { status: 'EXERCISE_ALREADY_EXISTS', externalId: payload.external_id };
      default:
        return { status: 'error', externalId: null };
    }
    return {
      status: response.status,
      externalId: response.external_id || null,
    };
  } catch {
    return { status: 'error', externalId: null };
  }
};

export const saveExercise = async (params, fetchData) => {
  const {
    externalId, title, description, selectedCategoryIds,
    categories, durationOptions, duration, selectedLanguageLevelId
  } = params;

  const durationId = durationOptions.find((d) => d.value === duration)?.id;
  const categoriesMap = selectedCategoryIds.map(id => categories.find(c => c.id === id));

  const data = {
    title,
    description,
    durationId,
    languageLevelId: selectedLanguageLevelId,
    createdByEmail: 'test@example.com',
    externalId,
    views: 0,
    likes: 0,
    filePath: `/uploads/exercises/${externalId}.h5p`,
    categories: categoriesMap,
  };

  await fetchData('/api/exercises', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};

export const uploadByExternalId = async (externalId, fetchData) => {
  await fetchData(`/api/exercises/upload?externalId=${externalId}`, {
    method: 'POST',
  });
};

export const submitExercise = async (params, fetchData) => {
  await saveExercise(params, fetchData);
  await uploadByExternalId(params.externalId, fetchData);
};
