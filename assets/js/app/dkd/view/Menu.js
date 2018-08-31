// Menu.js
Ext.define('dkd.view.Menu',
	{
        requires:[
			"Ext.Menu"
        ],
        constructor:function(){
			var me = this;
			me.items = [
				// {
				// 	text: 'Data Keuangan',
				// 	// iconCls: 'home',
				// 	ui: 'action',
				// 	handler: function() {
				// 		Ext.Viewport.animateActiveItem(app.Layout.MainPanel,{"type":"fade"});
				// 		Ext.Viewport.hideMenu('left');
				// 	}
				// },
				// {
				// 	text: 'Retribusi',
				// 	iconCls: 'icon-calculator',
				// 	ui: 'action',
				// 	handler: function() {
				// 		Ext.Viewport.hideMenu('left');
				// 	}
				// },
				// {
				// 	text: 'Pajak',
				// 	iconCls: 'icon-money',
				// 	ui: 'action',
				// 	handler: function() {
				// 		Ext.Viewport.hideMenu('left');
				// 	}
				// },
				{
					text: 'Pengaturan',
					iconCls: 'settings',
					ui: 'action',
					handler: function() {
						app.Settings.Panel.show();
						Ext.Viewport.hideMenu('left');
					}
				},
				{
					text: 'Bantuan',
					iconCls: 'icon-help',
					ui: 'action',
					handler: function() {
						Ext.Viewport.hideMenu('left');
					}
				},
				{
					text: 'Tentang',
					iconCls: 'info',
					ui: 'action',
					handler: function() {
						app.About.Panel.show();
						Ext.Viewport.hideMenu('left');
					}
				}
			];
			return Ext.create('Ext.Menu',{
				items : me.items
			});
		}
    }
);