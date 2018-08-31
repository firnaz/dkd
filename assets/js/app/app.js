function onDocumentReady(){
    // set loader config path
    Ext.Loader.setConfig({
        enabled: true,
        paths: {
            'dkd':'assets/js/app/dkd',
            'Ext.grid':'assets/js/senchatouch/grid'
        }
    });

    // create application container
    Ext.application({
        name: 'DKD',
        viewport : {
            requires:[
                "Ext.Logger",
                "Ext.Menu"
            ],
            layout: {
                type: 'card',
                animation: {
                    type: 'slide'
                }
            },
            // autoMaximize: (typeof(Ext.browser.is.PhoneGap) === 'undefined' || !Ext.browser.is.PhoneGap),
            masked: {
                xtype: 'loadmask',
                hidden:true
            },
            style:"z-index:9999;"
        },
        launch: function() {
            Ext.Viewport.setMasked(false);
            Ext.namespace('app');
            setTimeout(function(){
                Ext.Viewport.setMasked(true);
                initialize();
            },3000);
        }
    });
}

function initialize(){
    //create Menu
    app.apiURL = "http://geo.agrisoft.co.id/dkd/api/";
    app.Menu = Ext.create('dkd.view.Menu');
    Ext.Viewport.setMenu(app.Menu, {
        side: 'left',
        cover: false
    });
    // -- end creating menu

    // construct store
    app.store = {};
    app.store.SelectedTahun = Ext.create('dkd.store.SelectedTahun');
    app.store.SelectedRegion = Ext.create('dkd.store.SelectedRegion');
    app.store.SelectedIndikator = Ext.create('dkd.store.SelectedIndikator');

    // create Layout
    app.Layout = Ext.create('dkd.view.Layout',app.store);
    app.Region = Ext.create('dkd.view.Region',app.store);
    app.Indikator = Ext.create('dkd.view.Indikator',app.store);
    app.Tahun = Ext.create('dkd.view.Tahun',app.store);
    app.Chart = Ext.create('dkd.view.Chart');
    app.Settings = Ext.create('dkd.view.Settings');
    app.About = Ext.create('dkd.view.About');
    Ext.Viewport.add(app.Layout.MainPanel);
    Ext.Viewport.add(app.Region.Panel);
    Ext.Viewport.add(app.Indikator.Panel);
    Ext.Viewport.add(app.Tahun.Panel);
    Ext.Viewport.add(app.Chart.MainPanel);
    Ext.Viewport.add(app.Settings.Panel);
    Ext.Viewport.add(app.About.Panel);
    app.interval = setInterval(function(){
        if(app.Region.store.RegionPemda.isLoaded() && app.Region.store.RegionProvinsi.isLoaded() && app.Indikator.store.Indikator.isLoaded() && app.Tahun.store.Tahun.isLoaded()){
            Ext.Viewport.setMasked(false);
            clearInterval(app.interval);
        }
    },1000);
}