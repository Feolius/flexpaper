(function ($) {
    Drupal.behaviors.flexpaper = {
        attach: function (context, settings){

            //Get paths of swf files
            var paths = Drupal.settings.flexpaper.paths;

            //Get path of FlexPaperViewer.swf file
            var FlexPaperViewerPath = Drupal.settings.flexpaper.flexPaperViewerPath;

            //We have to be able to show a few documents on page. Calculate numberof documents that have
            //to be shown on the page
            var length = paths.length;
            var i = 0;

            //Find all elements with class viewerPlaceHolder
            var placeHolders = $('div.flexpaper_viewer');

            //Put ids for this elements
            placeHolders.each(function(index){
               // $(this).attr('id', 'viewerPlaceHolder_' + index);
                $(this).attr('id', 'documentViewer_' + index);
                //$(this).attr('id', 'documentViewer');
            });

            //Implements showing for each element
            for (var i = 0; i < length; i++){
                var id = 'documentViewer_' + i;
                var res = $.find('#' + id);
                if(res.length != 0){
                    var path = paths[i];
                    $('#' + id).FlexPaperViewer(
                        { config : {
                            SwfFile : path,
                            Scale : 0.6,
                            ZoomTransition : 'easeOut',
                            ZoomTime : 0.5,
                            ZoomInterval : 0.2,
                            FitPageOnLoad : false,
                            FitWidthOnLoad : true,
                            FullScreenAsMaxWindow : false,
                            ProgressiveLoading : false,
                            MinZoomSize : 0.2,
                            MaxZoomSize : 5,
                            SearchMatchAll : false,
                            InitViewMode : 'Portrait',
                            RenderingOrder : 'flash, html',

                            ViewModeToolsVisible : true,
                            ZoomToolsVisible : true,
                            NavToolsVisible : true,
                            CursorToolsVisible : true,
                            SearchToolsVisible : true,

                            jsDirectory : Drupal.settings.flexpaper.jsDirectory,
                            localeDirectory : '../locale/',

                            JSONDataType : 'json',
                            key : '',

                            localeChain: 'en_US'

                        }}
            );


//                    var fp = new FlexPaperViewer(
//                        FlexPaperViewerPath,
//                        id, {
//                            config : {
//                                SwfFile : path,
//                                Scale : 0.6,
//                                ZoomTransition : 'easeOut',
//                                ZoomTime : 0.5,
//                                ZoomInterval : 0.2,
//                                FitPageOnLoad : true,
//                                FitWidthOnLoad : false,
//                                FullScreenAsMaxWindow : false,
//                                ProgressiveLoading : false,
//                                MinZoomSize : 0.2,
//                                MaxZoomSize : 5,
//                                SearchMatchAll : true,
//                                InitViewMode : 'Portrait',
//
//                                ViewModeToolsVisible : true,
//                                ZoomToolsVisible : true,
//                                NavToolsVisible : true,
//                                CursorToolsVisible : true,
//                                SearchToolsVisible : true,
//
//                                localeChain: 'en_US'
//                            }
//                        });
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

