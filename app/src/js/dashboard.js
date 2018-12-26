setTimeout(function ()
    {
        if (self.name != '_refreshed_'){
        self.name = '_refreshed_';
        self.location.reload(true);
    } else {
        self.name = ''; 
    }
    }, 2000);