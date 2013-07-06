(function ($) {
    Drupal.behaviors.flexpaper = {
        attach: function (context, settings){

            //Get paths for swf and json files
            var paths = Drupal.settings.flexpaper.paths;
            var jsonFiles = Drupal.settings.flexpaper.jsonFiles;

            //We have to be able to show a few documents on page. Calculate numberof documents that have
            //to be shown on the page
            var length = paths.length;
            var i = 0;

            //Find all elements with class viewerPlaceHolder
            var placeHolders = $('div.flexpaper_viewer');

            //Put ids for this elements
            placeHolders.each(function(index){
                $(this).attr('id', 'documentViewer_' + index);
            });

            //Implements showing for each element
            for (var i = 0; i < length; i++){
                var id = 'documentViewer_' + i;
                var res = $.find('#' + id);
                if(res.length != 0){
                    $('#' + id).FlexPaperViewer(
                        { config : {
                            SwfFile : paths[i],
                            JSONFile : jsonFiles[i],

                            Scale : Drupal.settings.flexpaper.scale,
                            ZoomTransition : Drupal.settings.flexpaper.zoomTransition,
                            ZoomTime : Drupal.settings.flexpaper.zoomTime,
                            ZoomInterval : Drupal.settings.flexpaper.zoomInterval,
                            FitPageOnLoad : Drupal.settings.flexpaper.fitPageOnLoad,
                            FitWidthOnLoad : Drupal.settings.flexpaper.fitWidthOnLoad,
                            FullScreenAsMaxWindow : Drupal.settings.flexpaper.fullScreenAsMaxWindow,
                            ProgressiveLoading : Drupal.settings.flexpaper.progressiveLoading,
                            MinZoomSize : Drupal.settings.flexpaper.minZoomSize,
                            MaxZoomSize : Drupal.settings.flexpaper.maxZoomSize,
                            SearchMatchAll : Drupal.settings.flexpaper.searchMatchAll,
                            InitViewMode : Drupal.settings.flexpaper.initViewMode,
                            RenderingOrder : 'flash, html',

                            ViewModeToolsVisible : Drupal.settings.flexpaper.viewModeToolsVisible,
                            ZoomToolsVisible : Drupal.settings.flexpaper.zoomToolsVisible,
                            NavToolsVisible : Drupal.settings.flexpaper.navToolsVisible,
                            CursorToolsVisible : Drupal.settings.flexpaper.cursorToolsVisible,
                            SearchToolsVisible : Drupal.settings.flexpaper.searchToolsVisible,

                            jsDirectory : Drupal.settings.flexpaper.jsDirectory,

                            JSONDataType : 'json',
                            key : '',



                        }}
            );
                }

            }
            $('.flexpaper-highlight-button').click(function(){
                var instance = window.FlexPaperViewer_Instance;
                var api = instance.getApi();
                var searchTerm = $(this).val();
                api.searchText(searchTerm);
            });
        }
    }

})(jQuery);
//Implements higlighting search term after documents being load
function onDocumentLoaded(totalPages){
    var searchTerm = Drupal.settings.book_field.search;
    if (searchTerm != undefined){
        var instance = window.FlexPaperViewer_Instance;
        var api = instance.getApi();
        api.searchText(searchTerm);
    }
}
function onDocumentLoadedError(errMessage){
    $('#viewerPlaceHolder').html("Error displaying document. Make sure the conversion tool is installed and that correct user permissions are applied to the SWF Path directory");
}

