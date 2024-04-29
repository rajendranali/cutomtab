$(document).ready(function() {
    // Add new tab
    $('#addTab').click(function() {
        const tabContent = `
            <div class="tab">
                <input type="text" class="tab-url" placeholder="Enter URL">
                <button class="close-tab">&#10006;</button>
            </div>
        `;
        $('#tabs').children().removeClass('active-tab');
        $('#tabs').append(tabContent);
        $('#tabContents').append('<div class="tab-content"></div>');
        $('#tabs').children().last().addClass('active-tab');
    });

    // Close tab
    $(document).on('click', '.close-tab', function() {
        const index = $(this).closest('.tab').index();
        $(this).closest('.tab').remove();
        $('#tabContents').children().eq(index).remove();
        const newIndex = index === 0 ? 0 : index - 1;
        $('#tabs').children().eq(newIndex).addClass('active-tab');
        $('#tabContents').children().eq(newIndex).addClass('active-content');
    });

    // Load URL on Enter key press
// Function to convert various URLs to embeddable URLs
function getEmbedUrl(url) {
    let embedUrl = '';
    // Extract the domain from the URL
    const domain = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    if (domain && domain.length > 1) {
        // Append "/embed" after the domain
        embedUrl = `${domain[0]}/embed${url.substring(domain[0].length)}`;
    }
    return embedUrl;
}

// Event listener for keypress on URL input
$(document).on('keypress', '.tab-url', function(e) {
    if (e.key === 'Enter') {
        const index = $(this).closest('.tab').index();
        const url = $(this).val();
        const embedUrl = getEmbedUrl(url);
        if (embedUrl) {
            $('#tabContents').children().eq(index).html(`<iframe src="${embedUrl}" frameborder="0" width="100%" height="100%"></iframe>`);
        } else {
            // Handle invalid URLs
            console.error('Invalid URL');
        }
    }
});


    // Switch tabs
    $(document).on('click', '.tab', function() {
        $('#tabs').children().removeClass('active-tab');
        $(this).addClass('active-tab');
        const index = $(this).index();
        $('#tabContents').children().removeClass('active-content');
        $('#tabContents').children().eq(index).addClass('active-content');
    });
});


