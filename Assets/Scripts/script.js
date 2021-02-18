$(document).ready(function ()//Encouraged when using jQuery.
{
    /* DOM Elements */

    const container = $("#projects-container");

    /* Variables */

    const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";
    const TOKEN = "12a77cccc501456262926e1c5b3c032c6f00987d";

    var howManyProjects = 10;

    /* Primary Functions. */

    function init()
    {
        getProjects();
        console.log("All ready to go.");
    }

    /* Helper Functions. */

    function getProjects()
    {
        var myquery =
        `{
            user(login: "connerjm")
            {
                repositories (first: ${howManyProjects}, orderBy:{field: CREATED_AT direction: DESC}, ownerAffiliations: OWNER)
                {
                    nodes
                    {
                        name
                        description
                        openGraphImageUrl
                        url
                    }
                }
            }
        }`
        fetch(GITHUB_GRAPHQL_API,
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json", "Authorization": `bearer ${TOKEN}`
                },
                body: JSON.stringify({query: myquery})
            })
        .then((res) => res.json())
        .then((result) => { buildCards(result); });
    }

    function buildCards(data)
    {
        var reposArr = data.data.user.repositories.nodes;
        console.log(reposArr);
        var card;
        for(var i = 0; i < 10; i++)
        {
            var repo = reposArr[i];
            card = $(`<div class="card project-card">`);
            card.append($(`<img src="${repo.openGraphImageUrl}" class="card-img-top" alt="Image of the ${repo.name} Project.">`));
            var div = $(`<div class="card-body">`);
            div.append($(`<h5 class="card-title">`).text(`${repo.name}`));
            div.append($(`<p class="card-text">`).text(`${repo.description}`));
            div.append($(`<a href="${repo.url}" class="btn btn-dark" target="_blank">`).text(`Project Repo`));
            card.append(div);
            container.append(card);
        }
    }

    /* Attaching Listeners. */

    /* Function Calls. */

    init();

});

/*
    Learning the GraphQL API
    Need the Repository object
    Fields needed from the object is- description, name, openGraphImageUrl, url? or deployments->nodes->?
    Personal access token- 12a77cccc501456262926e1c5b3c032c6f00987d

    query
    {
        user(login: "connerjm")
        {
            repositories (last: 20, orderBy:
            {
            field: CREATED_AT
            direction: DESC
            }, ownerAffiliations: OWNER)
            {
                nodes
                {
                    name
                    description
                    openGraphImageUrl
                    url
                }
            }
        }
    }
*/