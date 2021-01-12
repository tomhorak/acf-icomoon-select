(function($){


	function initialize_field( $el ) {

		//$el.doStuff();

	}

	$(document).on('click', '[data-acf-icomoon-choice]', function(e){
		e.preventDefault();
		populateField($(this), $(this).closest('.acf-field'));
	});

	$(document).on('click', '[data-acf-icomoon-select-choose-button]', function(e){
		e.preventDefault();
		toggleSelectionList(true, $(this).closest('.acf-field'));
	});

	$(document).on('click', '[data-acf-icomoon-select-cancel-button]', function(e){
		e.preventDefault();
		toggleSelectionList(false, $(this).closest('.acf-field'));
	});

	$(document).on('click', '[data-acf-icomoon-remove-choice]', function(e){
		e.preventDefault();
		clearField($(this).closest('.acf-field'));
	});

	function populateField(element, parent)
	{
		var value = $(element).attr('data-acf-icomoon-choice');
		$(parent).find('[data-acf-icomoon-choice-field]').val(value);
		populatePreview(value, parent);
	}

	function toggleSelectionList(visible, parent)
	{
		if ( visible ){
			$(parent).find('.acf-icomoon_select-icon-list').show();
			$(parent).find('[data-acf-icomoon-select-choose-button]').hide();
			$(parent).find('[data-acf-icomoon-select-cancel-button]').show();
			return;
		}
		$(parent).find('[data-acf-icomoon-select-cancel-button]').hide();
		$(parent).find('[data-acf-icomoon-select-choose-button]').show();
		$(parent).find('.acf-icomoon_select-icon-list').hide();
	}

	function populatePreview(choice, parent)
	{
		var svg;
		$.each($(parent).find('[data-acf-icomoon-choice]'), function(){
			if ( $(parent).find(this).attr('data-acf-icomoon-choice') == choice ){
				$(parent).find(this).addClass('active');
				svg = $(parent).find(this).find('.svg');
			}
		});
		var html = $(parent).find(svg).html();
		html += '<p>' + choice + '<br><a href="#" data-acf-icomoon-remove-choice>Remove</a></p>';
		$(parent).find('[data-icomoon-icon-preview]').html(html).show();
		$(parent).find('.acf-icomoon_select-icon-list').hide();
		$(parent).find('[data-acf-icomoon-select-cancel-button]').hide();
	}

	function clearField(parent)
	{
		$(parent).find('[data-acf-icomoon-choice]').removeClass('active');
		$(parent).find('[data-icomoon-icon-preview]').empty().hide();
		$(parent).find('[data-acf-icomoon-choice-field]').val('');
		$(parent).find('[data-acf-icomoon-select-choose-button]').show();
	}


	if( typeof acf.add_action !== 'undefined' ) {

		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/

		acf.add_action('ready append', function( $el ){

			/**
			 * Loop through the type settings and hide/show choices
			 */
			var types = $('[data-name="selection_json_type"]');
			$.each(types, function(){
				var selection = $(this).find('select').val();
				toggleSettings(this, selection);
			});

			$(document).on('change', '[data-name="selection_json_type"] select', function(){
				var selection = $(this).val();
				toggleSettings(this, selection);
			});

			function toggleSettings(element, selection)
			{
				var path_choice = $(element).parents('table').find('[data-name="selection_json_path"]');
				var file_choice = $(element).parents('table').find('[data-name="selection_json_file"]');
				if ( selection === 'selection_json_file' ){
					$(path_choice).hide();
					$(file_choice).show();
					return;
				}
				$(file_choice).hide();
				$(path_choice).show();
			}

			// search $el for fields of type 'FIELD_NAME'
			acf.get_fields({ type : 'icomoon_select'}, $el).each(function(){

				initialize_field( $(this) );

			});

		});


	} else {


		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM.
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/

		$(document).on('acf/setup_fields', function(e, postbox){

			$(postbox).find('.field[data-field_type="icomoon_select"]').each(function(){

				initialize_field( $(this) );

			});

		});


	}


})(jQuery);
