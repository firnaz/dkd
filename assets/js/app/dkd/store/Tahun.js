Ext.define("dkd.store.Tahun", {
    requires : ['dkd.model.Tahun'],
    extend: 'Ext.data.Store',
    config: {
        model: 'dkd.model.Tahun',
        sorters: [
            {
                property: "name",
                direction: "ASC"
            }
        ],
        proxy: {
            type: "ajax",
            useDefaultXhrHeader: false,
            url : app.apiURL+"tahun",
            reader: {
                type: "json"
            }
        },
        autoLoad: true
    }
});
