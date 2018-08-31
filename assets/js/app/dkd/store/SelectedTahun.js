Ext.define("dkd.store.SelectedTahun", {
    requires : ['dkd.model.Tahun'],
    extend: 'Ext.data.Store',
    config: {
        model: 'dkd.model.Tahun',
        sorters: 'name',
        grouper: function(record) {
            return record.get('name')[0];
        },
        data: [
            // {name: "2010", kode:"2010"},
            // {name: "2011", kode:"2011"},
            // {name: "2012", kode:"2012"},
            // {name: "2013", kode:"2013"}
        ]
    }
});
