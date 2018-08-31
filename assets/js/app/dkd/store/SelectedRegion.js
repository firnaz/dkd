Ext.define("dkd.store.SelectedRegion", {
    requires : ['dkd.model.Region'],
    extend: 'Ext.data.Store',
    config: {
        model: 'dkd.model.Region',
        sorters: 'name',
        grouper: function(record) {
            return record.get('name')[0];
        },
        data: [
            // {name: "Kota Bandung", kode:"1"},
            // {name: "Prop. Sulawesi Utara", kode:"2"},
            // {name: "Kab. Kebumen", kode:"3"},
            // {name: "Kab. Tulang Bawang", kode:"4"}
        ]
    }
});
