Ext.define("dkd.store.Indikator", {
    requires : ['dkd.model.Indikator'],
    extend: 'Ext.data.Store',
    config: {
        model: 'dkd.model.Indikator',
        sorters: [
            {
                property: "name",
                direction: "ASC"
            }
        ],
        grouper: {
            groupFn: function(item){
                return item.get('parent');
            },
            sortProperty: 'parentorder'
        },
        proxy: {
            type: "ajax",
            useDefaultXhrHeader: false,
            url : app.apiURL+"indikator",
            reader: {
                type: "json"
            }
        },
        autoLoad: true
    }
});
