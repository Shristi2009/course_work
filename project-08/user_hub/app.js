const BASE_URL = 'https://jsonplace-univclone.herokuapp.com';

function fetchUsers() {
    return fetch(`${ BASE_URL }/users`).then(function (response) {
      // call json on the response, and return the result
        return response.json();
        
    }).catch(function (error) {
       //use console.error to log out any error
        console.error(error);
    });
}
  



function renderUser(user)
{
    const userElement=$(`<div class="user-card">
    <header>
      <h2>${user.name}</h2>
    </header>
    <section class="company-info">
      <p><b>Contact:</b> ${user.email}</p>
      <p><b>Works for:</b> ${user.company.name}</p>
      <p><b>Company creed:</b>${user.company.catchPhrase}</p>
    </section>
    <footer>
      <button class="load-posts">POSTS BY ${user.username}</button>
      <button class="load-albums">ALBUMS BY ${user.username}</button>
    </footer>
  </div>`).data('user', user)
    return userElement;

}

function renderUserList(userList)
{
    $('#user-list').empty();
    userList.forEach(function (user)
    {
        const userElement = renderUser(user);
        $('#user-list').append(userElement);

    }
        
);
}

function bootstrap() {
     
fetchUsers().then(renderUserList);   
  }
  
  bootstrap();

  $('#user-list').on('click', '.user-card .load-posts', function () {
    // load posts for this user
    // render posts for this user
      const user = $(this).closest('.user-card').data('user')
      fetchUserPosts(user.id).then(renderPostLists);
     
      
  });
  
  $('#user-list').on('click', '.user-card .load-albums', function () {
    // load albums for this user
    // render albums for this user
    const user = $(this).closest('.user-card').data('user')
      fetchUserAlbumList(user.id).then(renderAlbumList);
  });

  /* get an album list, or an array of albums */
function fetchUserAlbumList(userId){
    return fetch(`${ BASE_URL }/users/${ userId }/albums?_expand=user&_embed=photos`).then(function (response) {
        // convert from JSON to an object, and return
        return response.json();
      }).catch(function (error) {
        // console.error out the error
        console.error(error);
      }) 

}

fetchUserAlbumList(1).then(renderAlbumList);

/* render a single album */
function renderAlbum(album)

{
    console.log(album);
    const albumList = $(`
    <div class="album-card">
    <header>
      <h3>${album.title} </h3>
    </header>
    <section class="photo-list">
      
    </section>
  </div>`)
    
    return albumList;
}

/* render a single photo */
function renderPhoto(photo)
{
    const photohtml = $(`
    <div class="photo-card">
    <a href=${photo.url}>
      <img src=${photo.thumbnailUrl}>
      <figure>${photo.title}</figure>
    </a>
  </div>
    `)
    return photohtml;

}

/* render an array of albums */
function renderAlbumList(albumList)
{
    $('#album-list').empty();
    albumList.forEach(function (album)
    {
        const userAlbum = renderAlbum(album);
        $('#album-list').append(userAlbum);

    }
    );
}

function fetchData(url){
    return fetch(url).then(function (response) {
        // call json on the response, and return the result
          return response.json();
          
      }).catch(function (error) {
         //use console.error to log out any error
          console.error(error);
      });
}

// function fetchUsers() {
//     return fetchData(`${ BASE_URL }/users`);
//   }
  
//   function fetchUserAlbumList(userId) {
//     return fetchData(`THE OTHER URL WE MADE`);
//   }


function fetchUserPosts(userId) {
    return fetchData(`${ BASE_URL }/users/${ userId }/posts?_expand=user`);
  }
  
  function fetchPostComments(postId) {
    return fetchData(`${ BASE_URL }/posts/${ postId }/comments`);
}
  
fetchUserPosts(1).then(console.log); 

fetchPostComments(1).then(console.log);