if (typeof jsBackend.media == "undefined") {
   jsBackend.media = {};
}

jsBackend.media.uploader_replace_poster =
{
	// constructor
	init: function()
	{

		if($('#js-uploadify-poster').length > 0)
		{

			$replacePosterFileDialog = $('#replacePosterFileDialog');

			if($replacePosterFileDialog.length > 0)
			{
				$replacePosterFileDialog.dialog(
				{
					autoOpen: false,
					draggable: false,
					resizable: false,
					modal: true,
					buttons:
					[
						{
							text: utils.string.ucfirst(jsBackend.locale.lbl('Upload')),
							click: function()
							{
								$('#js-uploadify-poster').uploadifive('upload')
							}
						},
						{
							text: utils.string.ucfirst(jsBackend.locale.lbl('Cancel')),
							click: function()
							{
								// close the dialog
								$(this).dialog('close');
							}
						}
					],
					close: function(e, ui)
					{

					}
				});

				$('.js-replace-poster-file').click(function(e){
					$replacePosterFileDialog.dialog('open');
					e.preventDefault();
				});
			}

			$('#js-uploadify-poster').uploadifive({
					'width'				: 'auto',
					'height'			: 'auto',
					'auto'             	: false,
					'debug'				: jsBackend.current.debug,
					'simUploadLimit' 	: 1,
					'multi'				: false,
					'formData'         	: {
											
											'timestamp' : jsBackend.data.get('media.upload_timestamp'),
											'token'     : jsBackend.data.get('media.upload_token'),
											'id'     : jsBackend.data.get('media.id'),
											'fork[module]'     : jsBackend.current.module,
											'fork[action]'	: 'ReplacePosterFile',
											'fork[language]'	: jsBackend.current.language
										 },
					'queueID'			: 'js-uploadify-poster-queue',
					'uploadScript' 		: '/backend/ajax',
					'removeCompleted' 	: false,
					'buttonClass'		: 'uploadifive-select-button',
					'fileType'     		: jsBackend.data.get('media.allowed_poster_file_types'),
					'buttonText'		: utils.string.ucfirst(jsBackend.locale.lbl('SelectFile')),
					'onQueueComplete' 	: function(file, data)
					{ 
						//window.location = jsBackend.data.get('media.upload_uploaded_success_url')

						$('form#edit').submit();
					},
					'onFallback'		: function() {
						//window.location = jsBackend.data.get('media.upload_uploaded_fallback_url')
					 },
					 'onAddQueueItem'		: function(queue) {
						$('#js-uploadify-poster').uploadifive('clearQueue');
					 }
				});


			$('.js-poster-upload-start').click(function(e){
				e.preventDefault();
				$('#js-uploadify-poster').uploadifive('upload')
			});

			$('.uploadifive-button').removeClass('uploadifive-button');
		}
	}
}

$(jsBackend.media.uploader_replace_poster.init);
