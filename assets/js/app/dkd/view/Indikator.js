//Indikator.js
Ext.define('dkd.view.Indikator',{
	requires: [
		'Ext.Panel',
		'Ext.Container',
		'Ext.List',
		'dkd.store.Indikator'
    ],
    store:{},
	constructor: function (store){
		var me = this;
		me.store.SelectedIndikator = store.SelectedIndikator;
		me.createPanel();
	},
	createPanel:function(){
		var me = this;
		me.store.Indikator = new dkd.store.Indikator();

		me.List  = Ext.create('Ext.List',{
			grouped:true,
			title: 'Indikator',
			itemTpl: '<div>{name}<span class="item-check"></span></div>',
			mode: 'MULTI',
			flex:2,
			// onItemDisclosure:true,
			// bufferSize:1,
			variableHeights:true,
			infinite:true,
			store: me.store.Indikator,
			scrollToTopOnRefresh:false,
			items:[
				{
					docked: 'top',
					xtype: 'toolbar',
					cls: 'search-toolbar',
					items: [
                        {
                            xtype: 'searchfield',
                            placeHolder: 'Cari Indikator',
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
					if(list.getSelectionCount()>5){
						list.deselect(record);
						Ext.Msg.alert("Peringatan","Anda hanya dapat memilih maksimal 5 indikator");
						return false;
					}else{
						me.store.SelectedIndikator.add(record);
					}
				},
				deselect:function(list,record){
					me.store.SelectedIndikator.remove(record);
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
			store: me.store.SelectedIndikator,
			disableSelection: true,
			onItemDisclosure:true,
			cls:'bottom-selected-list',
			emptyText: 'Kosong...',
			items:[
				{
					ui:'light',
					docked: 'top',
					xtype: 'toolbar',
					title: 'Indikator Terpilih'
				}
			],
			listeners:{
				disclose: function(list, record, html, index, e, eOpts){
					me.store.SelectedIndikator.remove(record);
					me.List.deselect(record);
				}
			}
		});
		me.Panel = new Ext.Panel({
			title:'Indikator',
			layout:'vbox',
			items:[
				{
					docked: 'top',
					xtype: 'titlebar',
					title: ('Indikator').toUpperCase(),
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
				me.List,
				me.SelectedList
			]
		});
	},
    onSearchKeyUp: function(field,newvalue,oldvalue) {
        var me = this;
        var value = field.getValue(), store = me.List.getStore();
        store.clearFilter();
        if (value) {
			store.filter("name",value,true);
        }
    },
    onSearchClearIconTap: function() {
		var me = this;
        me.List.getStore().clearFilter();
    }
});

