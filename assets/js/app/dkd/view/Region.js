//Region.js
Ext.define('dkd.view.Region',{
	requires: [
		'Ext.Panel',
		'Ext.Container',
		'Ext.List',
		'Ext.tab.Panel',
		'dkd.store.RegionPemda',
		'dkd.store.RegionProvinsi'
    ],
    store:{},
    list:{},
	constructor: function (store){
		var me = this;
		me.store.SelectedRegion = store.SelectedRegion;
		me.createPanel();
	},
	createPanel:function(){
		var me = this;
		me.store.RegionPemda = new dkd.store.RegionPemda();
		me.store.RegionProvinsi = new dkd.store.RegionProvinsi();

		me.list.RegionPemda  = new Ext.List({
			// grouped:true,
			title: 'Pemerintah Daerah',
			itemTpl: '<div>{name}<span class="item-check"></span></div>',
			mode: 'MULTI',
			// bufferSize:1,
			variableHeights:true,
			infinite:true,
			store: me.store.RegionPemda,
			items:[
				{
					docked: 'top',
					xtype: 'toolbar',
					cls: 'search-toolbar',
					items: [
                        {
                            xtype: 'searchfield',
                            placeHolder: 'Cari Pemda',
                            listeners: {
                                scope: me,
                                clearicontap: me.onSearchClearIconTap,
                                change: me.onSearchKeyUp
                            }
                        }
					]
				}
			],
			listeners:{
				select: function(list,record){
					if(me.list.RegionPemda.getSelectionCount()+me.list.RegionProvinsi.getSelectionCount()>5){
						list.deselect(record);
						Ext.Msg.alert("Peringatan","Anda hanya dapat memilih maksimal 5 wilayah");
						return false;
					}else{
						me.store.SelectedRegion.add(record);
					}
				},
				deselect:function(list,record){
					me.store.SelectedRegion.remove(record);
				},
                refresh:function (list,eOpts){
					list.getScrollable().getScroller().scrollToEnd(true);
					list.getScrollable().getScroller().scrollToTop(true);
                }
			}
		});

		me.list.RegionProvinsi  = Ext.create('Ext.List',{
			// grouped:true,
			title: 'Se-Provinsi',
			itemTpl: '<div>{name}<span class="item-check"></span></div>',
			mode: 'MULTI',
			variableHeights:true,
			infinite:true,
			// onItemDisclosure:true,
			store: me.store.RegionProvinsi,
			scrollToTopOnRefresh:true,
			items:[
				{
					docked: 'top',
					xtype: 'toolbar',
					cls: 'search-toolbar',
					items: [
                        {
                            xtype: 'searchfield',
                            placeHolder: 'Cari Provinsi',
                            listeners: {
                                scope: me,
                                clearicontap: me.onSearchClearIconTap,
                                change: me.onSearchKeyUp
                            }
                        }
					]
				}
			],
			listeners:{
				select: function(list,record){
					if(me.list.RegionPemda.getSelectionCount()+me.list.RegionProvinsi.getSelectionCount()>5){
						list.deselect(record);
						Ext.Msg.alert("Peringatan","Anda hanya dapat memilih maksimal 5 wilayah");
						return false;
					}else{
						me.store.SelectedRegion.add(record);
					}
				},
				deselect:function(list,record){
					me.store.SelectedRegion.remove(record);
				},
                refresh:function (list,eOpts){
					list.getScrollable().getScroller().scrollToEnd(true);
					list.getScrollable().getScroller().scrollToTop(true);
                }
			}
		});
		me.SelectedList = new Ext.List({
			itemTpl: '<div class="center">{name}<span class="item-check"></span></div>',
			flex:1,
			store: me.store.SelectedRegion,
			disableSelection: true,
			onItemDisclosure:true,
			cls:'bottom-selected-list',
			emptyText: 'Kosong...',
			items:[
				{
					ui:'light',
					docked: 'top',
					xtype: 'toolbar',
					title: 'Wilayah Terpilih'
				}
			],
			listeners:{
				disclose: function(list, record, html, index, e, eOpts){
					me.store.SelectedRegion.remove(record);
					if (record.get('tipe')=="pemda"){
						me.list.RegionPemda.deselect(record);
					}else{
						me.list.RegionProvinsi.deselect(record);
					}
				}
			}
		});

		me.TabRegion = new Ext.tab.Panel({
			ui: 'light',
			flex:2,
			tabBar: {
				ui: 'dark',
				layout: {
					pack: 'center'
				}
			},
			activeTab: 1,
			defaults: {
				scrollable: true
			},
			items:[
				me.list.RegionPemda,
				me.list.RegionProvinsi
			]
		});

		me.Panel = new Ext.Panel({
			title:'Daerah',
			layout: 'vbox',
			items:[
				{
					docked: 'top',
					xtype: 'titlebar',
					title: ('Daerah').toUpperCase(),
					items:[
						{
							xtype: 'button',
							text: 'Kembali',
							ui: 'back',
							handler: function(){
								Ext.Viewport.animateActiveItem(app.Layout.MainPanel,{type:'slide',direction:'right'});
							}
						},
					]
				},
				me.TabRegion,
				me.SelectedList
			]
		});
	},
    onSearchKeyUp: function(field) {
        var value = field.getValue(), store = field.getParent().getParent().getStore();
        store.clearFilter();
        if (value) {
			store.filter("name",value,true);
        }
    },
    onSearchClearIconTap: function(field) {
		var me = this;
        field.getParent().getParent().getStore().clearFilter();
    }
});

