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
        $('#tabContents').append('<iframe class="tab-content" src=""></iframe>');
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

    // Load URL
    $(document).on('keypress', '.tab-url', function(e) {
        if (e.key === 'Enter') {
            const index = $(this).closest('.tab').index();
            const url = $(this).val();
            $('#tabContents').children().eq(index).attr('src', url);
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
