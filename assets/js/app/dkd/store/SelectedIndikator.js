Ext.define("dkd.store.SelectedIndikator", {
    requires : ['dkd.model.Indikator'],
    extend: 'Ext.data.Store',
    config: {
        model: 'dkd.model.Indikator',
        sorters: 'name',
        grouper: function(record) {
            return record.get('name')[0];
        },
        data: [
            // {name: "Kesehatan", kode:"1"},
            // {name: "Pajak Daerah", kode:"2"},
            // {name: "Belanja Pegawai", kode:"3"}
        ]
    }
});
