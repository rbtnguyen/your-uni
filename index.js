document.addEventListener('DOMContentLoaded', function(event) { 
  const source = 'https://gist.githubusercontent.com/simonlast/d5a86ba0c82e1b0d9f6e3d2581b95755/raw/f608b9b896dd3339df13dae317998d5f24c00a50/edu-scorecard.csv';
  
  setUpPage();

  function setUpPage() {
    fetchData(source).then((data)=>{
      const dataArray = convertCsvToArray(data);
      createUniversityBlocksSection(dataArray, '.university-blocks-section')
    })
  }

  async function fetchData(source) {
    let response = await fetch(source);
    if (response.status === 200) {
      let data = await response.text();
      return data;
    } else {
      //TODO: handle potential error or empty state
    }  
  }

  //convert csv to array of objects with key, value
  function convertCsvToArray(csv) {
    const lines = csv.split('\n');
    let array = [];
    const keys = lines[0].split(',');

    for (let i = 1; lines.length; i++) {
      let obj = {};
      let entry = lines[i].split(',');
      for (let j = 0; j < keys.length; j++) {
        obj[keys[j]] = entry[j];
      }
      array.push(obj)
    }
    return result;
  }

  //convert csv to array of objects with key, value
  function convertCsvToArray(csv){
    const lines = csv.split("\n");
    let result = [];
    const headers = lines[0].split(",");
    for(let i = 1; i < lines.length; i++){
      let obj = {};
      let currentline = lines[i].split(",");
      for(let j = 0; j < headers.length; j++){
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }

  // UNITID,INSTNM,CITY,STABBR,INSTURL
  function createUniversityBlock(universityData) {
    const fragment = new DocumentFragment();
    //Create containing article element
    const block = document.createElement('article');
    block.classList.add('university-block')
    //Create location p tag
    const collegeLocation = document.createElement('p');
    collegeLocation.classList.add('university-location')
    collegeLocation.textContent = `${universityData.CITY} · ${universityData.STABBR}`;
    //Create name p tag
    const collegeName = document.createElement('p');
    collegeName.classList.add('university-name')
    collegeName.textContent = universityData.INSTNM;
    //Create link p tag and a tag
    const collegeLinkContainer = document.createElement('p');
    const collegeLink = document.createElement('a');
    collegeLinkContainer.classList.add('university-link-container');
    collegeLink.classList.add('university-link');
    collegeLink.textContent = universityData.INSTURL;
    collegeLink.href = `https://${universityData.INSTURL}`;
    // collegeLink.target = '_blank';
    collegeLinkContainer.append(collegeLink);
    //Append elements to containing article element aka block
    [collegeLocation, collegeName, collegeLinkContainer].forEach((el) => {
      block.append(el);
    })
    //Append block to document fragment and return
    fragment.append(block);
    return fragment;
  } 

  function createUniversityBlocksSection(universitiesArray, sectionClassName) {
    const section = document.querySelector(sectionClassName);
    universitiesArray.forEach((entry, index) => {
      //Append blocks to DOM
      const block = createUniversityBlock(entry);
      section.append(block);
    })
  }

});

//Vary rough university filter and hide/show function
function filterSchools(event) {
  const allUniversityNames = document.querySelectorAll('.university-name');
  const searchValue = event.target.value;
  [...allUniversityNames].forEach((entry) => {
    const capitalizedEntryName = entry.textContent.toUpperCase();
    const capitalizedSearchValue = searchValue.toUpperCase();
    if (!capitalizedEntryName.match(capitalizedSearchValue)) {
      entry.closest('.university-block').style.display = 'none'
      // entry.closest('.university-block').classList.add('hidden');
    } else {
      entry.closest('.university-block').style.display = 'flex';
      // entry.closest('.university-block').classList.remove('hidden');
    }
  })

}
