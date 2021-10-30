function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
  }
  
  const btn = document.querySelector('#salvesta');
  btn.addEventListener('click', (event) => {
    result = getSelectedCheckboxValues('chk');
    if(result.length == 0) {
      alert("Vali vähemalt üks korpus!");
    } else {
      window.location = "vahekorpus2.html";
    }
    localStorage.setItem("korpused", JSON.stringify(result));
  });