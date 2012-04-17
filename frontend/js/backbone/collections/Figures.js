// OsciTk Namespace Initialization //
if (typeof OsciTk === 'undefined'){OsciTk = {};}
if (typeof OsciTk.collections === 'undefined'){OsciTk.collections = {};}
// OsciTk Namespace Initializaiotn //

jQuery(function() {
	OsciTk.collections.Figures = OsciTk.collections.BaseCollection.extend({
		model: OsciTk.models.Figure,
		
		initialize: function() {
			this.dispatcher.bind('figuresAvailable', function(figures) {
				console.log(figures, 'figuresAvailable');
				this.populateFromMarkup(figures);
			}, this);
		},
		
		populateFromMarkup: function(data) {
			_.each($('figure', data), function(markup) {
				var idComponents = markup.id.match(/\w+-(\d+)-(\d+)/);
				var figure = {
					id:         markup.id,
					rawData:    markup,
					body:       markup.innerHTML,
					section_id: idComponents[1],
					delta:      idComponents[2],
					title:      $(markup).attr('title'),
					caption:    $('figcaption', markup).html(),
					position:   $(markup).attr('data-position'),
					columns:    $(markup).attr('data-columns'),
					options:    JSON.parse($(markup).attr('data-options'))
				};
				this.create(figure, {dispatcher: this.dispatcher});
			}, this);
		}
	});
});