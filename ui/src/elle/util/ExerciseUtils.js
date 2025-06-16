export const extractId = (link) => {
  const match = link.match(/\/node\/(\d+)/);
  return match ? match[1] : null;
};

export const validateLink = async (link, fetchData) => {
  const externalId = extractId(link);
  if (!externalId) return { status: 'error', externalId: null };

  try {
    const urlObj = new URL(link);
    if (urlObj.hostname !== 'sisuloome.e-koolikott.ee') {
      return { status: 'error', externalId: null };
    }
  } catch {
    return { status: 'error', externalId: null };
  }

  try {
    const response = await fetchData('/api/exercises/validate-link', {
      method: 'POST',
      body: JSON.stringify({ link }),
      headers: { 'Content-Type': 'application/json' }
    });

    return {
      status: response.status === 'ok' || response.status === 'already_exists' ? 'success' : 'error',
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

  await fetchData('http://localhost:9090/api/exercises', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};

export const uploadByExternalId = async (externalId, fetchData) => {
  await fetchData(`http://localhost:9090/api/exercises/upload?externalId=${externalId}`, {
    method: 'POST',
  });
};

export const submitExercise = async (params, fetchData) => {
  await saveExercise(params, fetchData);
  await uploadByExternalId(params.externalId, fetchData);
};