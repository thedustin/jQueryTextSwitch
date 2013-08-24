/**
 * Created with JetBrains PhpStorm.
 * User: Dustin
 * Date: 24.08.13
 * Time: 21:23
 * To change this template use File | Settings | File Templates.
 */

(function($){

    $("[data-new-text]").each(function(i){
        var _oSelf = $(this);

        console.log("LOAD THE CANONS!");
        window.setTimeout(function(){
            console.log("FIRE!");
            _oSelf.textSwitch(_oSelf.attr("data-new-text"), {
                "effect": "charFade"
            });
        }, i * 1000);
    });

})(jQuery);