
(async () => {


    // Get the configuration information from the config.js file
    const config =  await fetch("config").then((response) =>
        response.json()
    );

    // create qlik-embed script 
    var qlik_embed_script = document.createElement('script');
    qlik_embed_script.setAttribute('crossorigin','anonymous');
    qlik_embed_script.setAttribute('type','application/javascript');
    qlik_embed_script.setAttribute('src','https://cdn.jsdelivr.net/npm/@qlik/embed-web-components/dist/index.min.js');
    qlik_embed_script.setAttribute('data-host',`https://${config.tenantHostname}`);
    qlik_embed_script.setAttribute('data-client-id',`${config.oauthClient}`);
    qlik_embed_script.setAttribute('data-redirect-uri','https://127.0.0.1:1235/oauth_callback.html');
    qlik_embed_script.setAttribute('data-access-token-storage','session');
    

    document.head.appendChild(qlik_embed_script);

    var path = window.location.pathname;
    var page = path.split("/").pop();

    var qlik_embed = document.createElement('qlik-embed');
    
    // Content to show 
    switch (page) {


        case '':
            break;

        case 'mobile':
            break;

        default:
            break;
    }

    // qlik_embed.setAttribute('clear-selections','TRUE');
    // qlik_embed.setAttribute('theme', `${config.theme}`)
    // document.getElementById("qlik-embed-container").appendChild(qlik_embed);  

    })();;