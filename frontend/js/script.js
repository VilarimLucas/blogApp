











// Função para carregar os posts do servidor
function loadPosts() {

    // Faça uma solicitação AJAX para obter os dados dos posts usando jQuery
    $.ajax({
        url: 'http://localhost:8081/rota_post/all',
        method: 'GET',
        dataType: 'json',
        success: function (posts) {
            // Agora você tem os dados dos posts no formato JSON
            // Aqui você pode percorrer os posts e exibi-los na página
            const blogContainer = document.getElementById('blog-posts');

            posts.forEach(post => {
                const postHTML = `
                <!-- Single Blog Area -->
                <div class="col-10">
                    <div class="single-blog-area text-center mb-100 wow fadeInUpBig" data-wow-delay="100ms"
                        data-wow-duration="1s">
                        <div class="blog-thumbnail mb-100">
                            <img src="img/bg-img/${post.image}" alt="">
                        </div>
                        <div class="blog-content">
                            <span></span>
                            <h2>${post.title}</h2>
                            <a href="#" class="post-date">${post.date}</a>
                            <a href="#" class="post-author">By ${post.author}</a>
                            ${post.textPost}
                            <a href="#" class="btn studio-btn"><img src="img/core-img/logo-icon.png" alt=""> Read
                                More</a>
                        </div>
                    </div>
                </div>
            `;
                blogContainer.innerHTML += postHTML;
            });
        },
        error: function (error) {
            console.error('Erro ao carregar os posts:', error);
        }
    });
}

// Chame a função para carregar os posts quando a página for carregada
$(document).ready(function () {
    loadPosts();
});