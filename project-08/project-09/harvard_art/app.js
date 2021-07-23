const BASE_URL = 'https://api.harvardartmuseums.org';
const KEY = 'apikey=910d87c2-f029-48c0-9490-8f5649259216'; // USE YOUR KEY HERE

async function fetchObjects() {
    const url = `${BASE_URL}/object?${KEY}`;
    
    try
    {
        const response = await fetch(url);
        const data = await response.json();
        
      
        return data;
      
    } catch (error)
    {
        console.error(error);
    }
    
    
}

async function fetchAllCenturies()
{
    const url = `${BASE_URL}/century?${KEY}&size=100&sort=temporalorder`;
    if (localStorage.getItem('centuries')) {
        return JSON.parse(localStorage.getItem('centuries'));
      }

    try {
      const response = await fetch(url);
      const data = await response.json();
      const records = data.records;
      localStorage.setItem('centuires', JSON.stringify(records));
      return records;
    } catch (error) {
      console.error(error);
    }
    

}
fetchAllCenturies();
fetchAllCenturies();


fetchObjects().then(x => console.log(x));

async function fetchAllClassifications()
{
    const url = `${BASE_URL}/classification?${KEY}&size=100&sort=name`;
    if (localStorage.getItem('classifications'))
    {
    
        return JSON.parse(localStorage.getItem('classifications'));
    }
    try
    {
        const response = await fetch(url);
        const data = await response.json();
        const records = data.records;
        localStorage.setItem('classifications', JSON.stringify(records));
        return records;
    } catch (error) {
      console.error(error);
    }
    
}
fetchAllClassifications();

async function prefetchCategoryLists()
{
    try
    {
        const [
            classifications, centuries
        ] = await Promise.all([
            fetchAllClassifications(),
            fetchAllCenturies()
        ]);
    
        // This provides a clue to the user, that there are items in the dropdown
        $('.classification-count').text(`(${classifications.length})`);

        classifications.forEach(classification =>
        {
            
            $('#select-classification').append(`<option value="${classification.name}">${classification.name}</option>`);
            // append a correctly formatted option tag into
            // the element with id select-classification
        });

        // This provides a clue to the user, that there are items in the dropdown
        $('.century-count').text(`(${centuries.length}))`);

        centuries.forEach(century =>
        {
            $('#select-century').append(`<option value="${century.name}">${century.name}</option>`);
            // append a correctly formatted option tag into
            // the element with id select-century
        });
    
    } catch (error)
    {
        console.error(error);
    }
}

 prefetchCategoryLists();

function buildSearchString()
{
    const classificationValue = $('#select-classification').val();
    const centuryValue = $('#select-century').val();
    const keyWord = $('#keywords').val();
    const url = `${BASE_URL}/object?${KEY}&classification=${classificationValue}&century=${centuryValue}&keyword=${keyWord}`;
    console.log(url);
    const encodedUrl = encodeURI(url);
    console.log( "encoded",encodedUrl);
    return encodedUrl;
}

buildSearchString();

$('#search').on('submit', async function (event)
{
    event.preventDefault();
    // prevent the default
    onFetchStart();
  
    try
    {
        const response = await fetch(buildSearchString());
        const data = await response.json();
        console.log(data);
        console.log(data.records);
        updatePreview(data.records, data.info);

          } catch (error)
    {
        console.error(error);
      
    } finally
    {
        onFetchEnd();
    }
    
});

function onFetchStart()
{
    $('#loading').addClass('active');
}
  
function onFetchEnd() 
{
    $('#loading').removeClass('active');
}
  
function renderPreview(record) 
{

   const previewhtml = $(`<div class="object-preview">
      <a href="#">
        <img src=${record.primaryimageurl ? record.primaryimageurl : null} />
            <h3>${record.title ? record.title : null}</h3>
            <h3>${record.description ? record.description : null}</h3>
      </a>
    </div>`).data('record', record);
  
   
    return previewhtml;
    
}
  
  
function updatePreview(records, info) 
{

    const root = $('#preview');
    if (info.next)
    {
        const nextButton = root.find('.next');
        console.log(nextButton);
        nextButton.data('url', info.next);
        nextButton.attr('disabled', false);
        
    } else
    {
        $('.next').data('url', null);
        $('.next').attr('disabled', true);

        console.log("i am inside update preview else")
        
    }

    if (info.prev)
    {
    
        $('.previous').data('url', info.prev);
        $('.previous').attr('disabled', false);

        
    } else
    {
        //const nextButton = root.find('next')
        $('.previous').data('url', null);
        $('.previous').attr('disabled', true);

        console.log("i am inside update preview else")
        
    }
      const result = root.find('.results');
      result.empty();
      console.log(result);
      records.forEach(function (record)
      {
          result.append(renderPreview(record));
      });
    return result;
  
    // grab the results element, it matches .results inside root
    // empty it
    // loop over the records, and append the renderPreview
}

$('#preview .next, #preview .previous').on('click', async function () {
    /*
      read off url from the target 
      fetch the url
      read the records and info from the response.json()
      update the preview
    */
    onFetchStart();
    try 
    {
    
        const urlValue = $(this).data('url');
        console.log("*******************************",urlValue);
        const response = await fetch(urlValue);
        const data = await response.json();
        updatePreview(data.records, data.info);
    } catch (error)
    {
        console.error(error);
    }finally
    {
        onFetchEnd();
    }
    
});

  
$('#preview').on('click', '.object-preview', function (event) {
    event.preventDefault(); 
    const grabElement = $(this).closest('.object-preview');
    console.log("grab object-preview",grabElement.data());
    const recoverDataFromElement = grabElement.data('record');
    console.log(recoverDataFromElement);
    $('#feature').empty();
    $('#feature').append(renderFeature(recoverDataFromElement));
    
});
  
function renderFeature(record)
{
   
    return $(`<div class="object-feature">
    <header>
    <h3>${record.title}</h3>
    <h4>${record.dated}</h4>
  </header>
  <section class="facts">
  ${ factHTML("Culture", record.culture,'culture') }
  ${ factHTML("Style", record.style) }
  ${ factHTML("technique", record.technique,'technique') }
  ${ factHTML("medium", record.medium, 'medium') }
  ${ factHTML("dimensions", record.dimensions) }
  ${  
    record.people
    ? record.people.map(function(person) {
        return factHTML('Person', person.displayname, 'person');
      }).join('')
    : ''
  }
 
  ${ factHTML("department", record.department) }
  ${ factHTML("division", record.division)}
  ${ factHTML('Contact', `<a target="_blank" href="mailto:${ record.contact }">${ record.contact }</a>`) }
  ${ factHTML("creditline", record.creditline)}
  
    
  </section>
  <section class="photos">
    <img src="${record.primaryimageurl}" />
    
  </section>
  
    </div>`);
}


function searchURL(searchType, searchString) 
{
    return `${ BASE_URL }/object?${ KEY }&${ searchType}=${ searchString }`;
}
  
  
function factHTML(title, content, searchTerm = null)
{
    if (!content)
    {
          return''
    }
    
    return `
    <span class="title">${title}</span>
    <span class="content">${searchTerm && content ? `<a href ="${searchURL(searchTerm,content)}">${content}</a>`:content}</span>`;
}



$('#feature').on('click', 'a', async function (event)
{
    const readHref = $(this).attr('href');
    console.log('HREF', readHref);
    event.preventDefault();
     onFetchStart();
  
    try
    {
        const response = await fetch(readHref);
        const data = await response.json();
        console.log(data);
        console.log(data.records);
        updatePreview(data.records, data.info);
       

      // get the url from `buildSearchString`
      // fetch it with await, store the result
      // log out both info and records when you get them
    } catch (error)
    {
        console.error(error);
      // log out the error
    } finally
    {
        onFetchEnd();
    }
});
  
