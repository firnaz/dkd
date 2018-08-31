Ext.define("dkd.store.RegionPemda", {
    requires : ['dkd.model.Region'],
    extend: 'Ext.data.Store',
    config: {
        model: 'dkd.model.Region',
        sorters: [
            {
                property: "name",
                direction: "ASC"
            }
            // {
            //     property: "kode",
            //     direction: "ASC"
            // }
        ],
        // grouper: {
        //     groupFn: function(item){
        //         return item.get('parent');
        //     },
        //     sortProperty:'kodeparent',
        //     direction:'ASC'
        // },
        proxy: {
            type: "ajax",
            useDefaultXhrHeader: false,
            url : app.apiURL+"region/pemda",
            reader: {
                type: "json"
            }
        },
        autoLoad: true
    }
});
