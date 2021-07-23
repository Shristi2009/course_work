const USERS_URL = `https://reqres.in/api/users?per_page=2`;

const metadata = {
  minPage: 1,
  currentPage: null,
  maxPage: null
};

function renderUser(user)
{
    const userElement = $(`
    <div>
        <h3>
            ${user.first_name} ${user.last_name}
        </h3>
        <p> ${user.email}</p>
        <img src="${user.avatar}"/>
    </div>
    `)
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

function updatePageInfo() {
}

function updateButtons() {
}

function fetchUserList(currentPage = 1){
    fetch(`${ USERS_URL }&page=${ currentPage }`)
    .then(function (res) {
      return res.json();
    })
    .then(function (userData) {
        metadata.currentPage = userData.page;
        metadata.maxPage = userData.total_pages;
        renderUserList(userData.data);
        console.log(metadata);
      // renderUserList
      // updatePageInfo
      // updateButtons
    })
    .catch(function (error) {

    });
}

$('#back').on('click', function ()
{
    if (metadata.currentPage <= metadata.minPage)
    {
        return;
    }
    fetchUserList(metadata.currentPage - 1);
});

$('#forward').on('click', function ()
{
    if (metadata.currentPage >= metadata.maxPage)
    {
        return;
    }
    fetchUserList(metadata.currentPage + 1);
});

function bootstrap() {
    fetchUserList();
}

bootstrap();