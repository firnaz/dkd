Ext.define("dkd.store.RegionProvinsi", {
    requires : ['dkd.model.Region'],
    extend: 'Ext.data.Store',
    config: {
        model: 'dkd.model.Region',
        sorters: [
            {
                property: "name",
                direction: "ASC"
            }
        ],
        proxy: {
            type: "ajax",
            useDefaultXhrHeader: false,
            url : app.apiURL+"region/provinsi",
            reader: {
                type: "json"
            }
        },
        autoLoad: true
    }
});
