$(function() {
  const content = $('#pfo-content');

  $(document)
    .on('click', '#pfo-nvbar .btn-run', () => {
      content
        .removeClass('light')
        .addClass('dark');
    })
    .on('click', '#pfo-nvbar .btn-group button', () => {
      content
        .removeClass('dark')
        .addClass('light');
    });
});