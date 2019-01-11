(function(w){
    w.today = function(){
        return moment().startOf('day');
    }
    w.now = function(){
        return moment();
    }
    w.setTabTitle = function(title){
        if (sforce && sforce.console){
            sforce.console.setTabTitle(title);
        }
    }
    w._eval = function(rule){
        var calc = new Function("return "+rule);
        return calc();
    }
    w.showWeSelect = function(){
        if (sforce && sforce.console){
            sforce.console.getEnclosingPrimaryTabId(function(result){
             	sforce.console.setSidebarVisible(true,result.id,
                                             sforce.console.Region.LEFT,
                                                 null);   
            });
        	addToBrowserTitleQueue("WeSelect");
        }
    }
    w.addToBrowserTitleQueue = function(title){
        if(sforce && sforce.console){
            sforce.console.addToBrowserTitleQueue(title);
        }
    }
    w.closeTab = function(){
        if(sforce && sforce.console){
            sforce.console.getEnclosingTabId(function(result){
                sforce.console.closeTab(result.id);
            });
        }
    }
})(window);