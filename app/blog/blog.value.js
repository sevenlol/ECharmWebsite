(function() {
    'use strict';

    angular
        .module('app.blog')
        .value('blogCategoryList', [
            { name : 'all', text : '所有文章', display : 'none', background_url : '',
              description : [], intro_icon_url : '' },
            { name : 'cosmeticsurgery', text : '醫學美容', display : 'full', background_url : 'images/cate-1.jpg',
              description : [ '雷射？玻尿酸？微晶瓷？減重？', '在做醫學美容前先了解一下吧' ], intro_icon_url : 'images/cosmetic_surgery.png' },
            { name : 'plasticsurgery', text : '整形外科', display : 'full', background_url : 'images/cate-2.jpg',
              description : [ '隆乳、隆鼻、割雙眼皮該用何種方式？', '由整型外科權威告訴您' ], intro_icon_url : 'images/plastic_surgery.png' },
            { name : 'gynecology', text : '婦科', display : 'left', background_url : 'images/cate-3.jpg',
              description : [ '月經異常、經痛、避孕安全期', '等問題來此發問' ], intro_icon_url : 'images/gynecology.png' },
            { name : 'obstetrics', text : '產科', display : 'right', background_url : 'images/cate-4.jpg',
              description : [ '媽媽懷孕前後的各個問題', '來此發問' ], intro_icon_url : 'images/obstetrics.png' },
            { name : 'dermatology', text : '皮膚科', display : 'left', background_url : 'images/cate-5.jpg',
              description : [ '專業醫師跟您講如何做', '皮膚保養與常見皮膚病' ], intro_icon_url : 'images/dermatology.png' },
            { name : 'pediatrics', text : '小兒科', display : 'right', background_url : 'images/cate-6.jpg',
              description : [ '由專業醫師為您解答', '寶寶照顧中的所有問題' ], intro_icon_url : 'images/pediatrics.png' },
            { name : 'oncology_consultation', text : '癌症諮詢', display : 'full-nopadding', background_url : 'images/oncology.png',
              description : [ '向專業醫師諮詢', '癌症相關知識' ], intro_icon_url : 'images/oncology-1.png' },
            { name : 'others', text : '其他醫學文章', display : 'full-nopadding', background_url : 'images/cate-7.jpg',
              description : [], intro_icon_url : 'images/pediatrics.png' }
        ])
        .value('blogTagList', [
            { category: '婦科', name : 'gynecology_01', text : '婦科癌症' },
            { category: '婦科', name : 'gynecology_02', text : '卵巢腫瘤' },
            { category: '婦科', name : 'gynecology_03', text : '子宮肌瘤' },
            { category: '婦科', name : 'gynecology_04', text : '多囊性卵巢症候群' },
            { category: '婦科', name : 'gynecology_05', text : '乳房保健' },
            { category: '婦科', name : 'gynecology_06', text : '更年期症候群' },
            { category: '婦科', name : 'gynecology_07', text : '腹腔鏡手術' },
            { category: '婦科', name : 'gynecology_08', text : '子宮鏡手術' },
            { category: '婦科', name : 'gynecology_09', text : '陰道鏡手術' },
            { category: '婦科', name : 'gynecology_10', text : '月經異常' },
            { category: '婦科', name : 'gynecology_11', text : '子宮頸抹片檢查' },
            { category: '婦科', name : 'gynecology_12', text : '婦女尿失禁' },
            { category: '婦科', name : 'gynecology_13', text : '子宮膀胱脫垂' },
            { category: '婦科', name : 'gynecology_14', text : '直腸脫垂' },

            { category: '產科', name : 'obstetrics_01', text : '遺傳諮詢' },
            { category: '產科', name : 'obstetrics_02', text : '產前檢查' },
            { category: '產科', name : 'obstetrics_03', text : '高層次胎兒超音波' },
            { category: '產科', name : 'obstetrics_04', text : '習慣性流產' },
            { category: '產科', name : 'obstetrics_05', text : '高危險妊娠' },
            { category: '產科', name : 'obstetrics_06', text : '不孕症' },
            { category: '產科', name : 'obstetrics_07', text : '試管嬰兒' },
            { category: '產科', name : 'obstetrics_08', text : '男性不孕症' },
            { category: '產科', name : 'obstetrics_09', text : '冷凍胚胎' },

            { category: '小兒科', name : 'pediatrics_01', text : '發展遲緩' },
            { category: '小兒科', name : 'pediatrics_02', text : '飲食障礙與肥胖(體重控制)' },
            { category: '小兒科', name : 'pediatrics_03', text : '妥瑞氏症' },
            { category: '小兒科', name : 'pediatrics_04', text : '注意力不足過動症' },
            { category: '小兒科', name : 'pediatrics_05', text : '小兒發燒與不明熱' },
            { category: '小兒科', name : 'pediatrics_06', text : '小兒咳嗽' },
            { category: '小兒科', name : 'pediatrics_07', text : '中耳炎' },
            { category: '小兒科', name : 'pediatrics_08', text : '鼻竇炎' },
            { category: '小兒科', name : 'pediatrics_09', text : '咽喉炎' },
            { category: '小兒科', name : 'pediatrics_10', text : '肺炎' },
            { category: '小兒科', name : 'pediatrics_11', text : '腸病毒' },
            { category: '小兒科', name : 'pediatrics_12', text : '川崎症' },
            { category: '小兒科', name : 'pediatrics_13', text : '流行性感冒' },
            { category: '小兒科', name : 'pediatrics_14', text : '結核病' },
            { category: '小兒科', name : 'pediatrics_15', text : '腦膜炎' },
            { category: '小兒科', name : 'pediatrics_16', text : '愛滋病' },
            { category: '小兒科', name : 'pediatrics_17', text : '黴菌感染' },
            { category: '小兒科', name : 'pediatrics_18', text : '先天性心血管異常' },
            { category: '小兒科', name : 'pediatrics_19', text : '心律不整' },
            { category: '小兒科', name : 'pediatrics_20', text : '夜尿/尿床' },
            { category: '小兒科', name : 'pediatrics_21', text : '血尿與蛋白尿' },
            { category: '小兒科', name : 'pediatrics_22', text : '泌尿道感染' },
            { category: '小兒科', name : 'pediatrics_23', text : '先天性泌尿道異常(膀胱輸尿管逆流)' },
            { category: '小兒科', name : 'pediatrics_24', text : '血液與腹膜透析' },
            { category: '小兒科', name : 'pediatrics_25', text : '糖尿病' },
            { category: '小兒科', name : 'pediatrics_26', text : '甲狀腺問題' },
            { category: '小兒科', name : 'pediatrics_27', text : '生殖器問題' },
            { category: '小兒科', name : 'pediatrics_28', text : '腎上腺問題' },
            { category: '小兒科', name : 'pediatrics_29', text : '多毛症' },
            { category: '小兒科', name : 'pediatrics_30', text : '多尿' },
            { category: '小兒科', name : 'pediatrics_31', text : '高血壓' },
            { category: '小兒科', name : 'pediatrics_32', text : '過敏' },
            { category: '小兒科', name : 'pediatrics_33', text : '過敏性減敏治療' },
            { category: '小兒科', name : 'pediatrics_34', text : '異位性皮膚炎' },
            { category: '小兒科', name : 'pediatrics_35', text : '氣喘' },
            { category: '小兒科', name : 'pediatrics_36', text : '蕁麻疹' },
            { category: '小兒科', name : 'pediatrics_37', text : '過敏性紫斑症' },
            { category: '小兒科', name : 'pediatrics_38', text : '幼年型風濕性關節炎' },
            { category: '小兒科', name : 'pediatrics_39', text : '全身性紅斑性狼瘡' },
            { category: '小兒科', name : 'pediatrics_40', text : '先天性免疫不全' },
            { category: '小兒科', name : 'pediatrics_41', text : '便祕' },
            { category: '小兒科', name : 'pediatrics_42', text : '腹瀉' },
            { category: '小兒科', name : 'pediatrics_43', text : '腸胃出血' },
            { category: '小兒科', name : 'pediatrics_44', text : '肝炎' },
            { category: '小兒科', name : 'pediatrics_45', text : '肝癌' },
            { category: '小兒科', name : 'pediatrics_46', text : '膽道閉鎖' },
            { category: '小兒科', name : 'pediatrics_47', text : '一般疫苗接踵' },
            { category: '小兒科', name : 'pediatrics_48', text : '特殊疫苗接踵' },
            { category: '小兒科', name : 'pediatrics_49', text : '頭痛' },
            { category: '小兒科', name : 'pediatrics_50', text : '熱性痙攣' },
            { category: '小兒科', name : 'pediatrics_51', text : '癲癇' },
            { category: '小兒科', name : 'pediatrics_52', text : '腦膜炎' },
            { category: '小兒科', name : 'pediatrics_53', text : '發展遲緩' },
            { category: '小兒科', name : 'pediatrics_54', text : '神經肌肉病變' },
            { category: '小兒科', name : 'pediatrics_55', text : '小兒神經外科' },
            { category: '小兒科', name : 'pediatrics_56', text : '早產兒照護' },
            { category: '小兒科', name : 'pediatrics_57', text : '新生兒重症' },
            { category: '小兒科', name : 'pediatrics_58', text : '支氣管鏡檢查' },

            { category: '皮膚科', name : 'dermatology_01', text : '灰指甲' },
            { category: '皮膚科', name : 'dermatology_02', text : '甲溝炎' },
            { category: '皮膚科', name : 'dermatology_03', text : '乾癬' },
            { category: '皮膚科', name : 'dermatology_04', text : '水泡性疾病' },
            { category: '皮膚科', name : 'dermatology_05', text : '傷口處理' },
            { category: '皮膚科', name : 'dermatology_06', text : '蟹足腫' },
            { category: '皮膚科', name : 'dermatology_07', text : '肥厚性疤痕' },
            { category: '皮膚科', name : 'dermatology_08', text : '紅斑性狼瘡' },
            { category: '皮膚科', name : 'dermatology_09', text : '硬皮症' },
            { category: '皮膚科', name : 'dermatology_10', text : '皮肌炎' },
            { category: '皮膚科', name : 'dermatology_11', text : '皮膚血管炎' },
            { category: '皮膚科', name : 'dermatology_12', text : '香港腳(足癬)' },
            { category: '皮膚科', name : 'dermatology_13', text : '體癬' },
            { category: '皮膚科', name : 'dermatology_14', text : '頭癬' },
            { category: '皮膚科', name : 'dermatology_15', text : '性傳染病(梅毒)' },
            { category: '皮膚科', name : 'dermatology_16', text : '帶狀皰疹' },
            { category: '皮膚科', name : 'dermatology_17', text : '水痘' },
            { category: '皮膚科', name : 'dermatology_18', text : '漢生病' },
            { category: '皮膚科', name : 'dermatology_19', text : '念珠菌感染' },
            { category: '皮膚科', name : 'dermatology_20', text : '汗斑' },
            { category: '皮膚科', name : 'dermatology_21', text : '頭蝨' },
            { category: '皮膚科', name : 'dermatology_22', text : '異位性皮膚炎' },
            { category: '皮膚科', name : 'dermatology_23', text : '痘疤' },
            { category: '皮膚科', name : 'dermatology_24', text : '接觸性皮膚炎' },
            { category: '皮膚科', name : 'dermatology_25', text : '富貴手' },
            { category: '皮膚科', name : 'dermatology_26', text : '異位性皮膚炎' },
            { category: '皮膚科', name : 'dermatology_27', text : '濕疹' },
            { category: '皮膚科', name : 'dermatology_28', text : '蕁麻疹' },
            { category: '皮膚科', name : 'dermatology_29', text : '酒槽性皮膚炎' },
            { category: '皮膚科', name : 'dermatology_30', text : '脂漏性皮膚炎' },
            { category: '皮膚科', name : 'dermatology_31', text : '禿頭' },
            { category: '皮膚科', name : 'dermatology_32', text : '毛囊炎' },
            { category: '皮膚科', name : 'dermatology_33', text : '雄性禿' },
            { category: '皮膚科', name : 'dermatology_34', text : '植髮手術' },
            { category: '皮膚科', name : 'dermatology_35', text : '雀斑' },
            { category: '皮膚科', name : 'dermatology_36', text : '肝斑' },
            { category: '皮膚科', name : 'dermatology_37', text : '曬斑' },
            { category: '皮膚科', name : 'dermatology_38', text : '老人斑' },
            { category: '皮膚科', name : 'dermatology_39', text : '黑斑' },
            { category: '皮膚科', name : 'dermatology_40', text : '咖啡牛奶斑' },
            { category: '皮膚科', name : 'dermatology_41', text : '太田氏母斑' },
            { category: '皮膚科', name : 'dermatology_42', text : '日光性皮膚病變' },
            { category: '皮膚科', name : 'dermatology_43', text : '良性與惡性皮膚腫瘤' },
            { category: '皮膚科', name : 'dermatology_44', text : '皮膚息肉' },
            { category: '皮膚科', name : 'dermatology_45', text : '基底細胞癌' },
            { category: '皮膚科', name : 'dermatology_46', text : '鱗狀細胞癌' },
            { category: '皮膚科', name : 'dermatology_47', text : '黑色素癌' },
            { category: '皮膚科', name : 'dermatology_48', text : '皮膚癌莫氏顯微圖像手術' },

			{ category: '醫療美容', name : 'cosmeticsurgery_01', text : '飛梭雷射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_02', text : '脈衝光' },
			{ category: '醫療美容', name : 'cosmeticsurgery_03', text : '雷射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_04', text : '微雕磨皮' },
			{ category: '醫療美容', name : 'cosmeticsurgery_05', text : '美白雷射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_06', text : '汽化雷射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_07', text : '染料雷射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_08', text : '銣雅克雷射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_09', text : '柔膚雷射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_10', text : '電波拉皮' },
			{ category: '醫療美容', name : 'cosmeticsurgery_11', text : '染料雷射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_12', text : '除毛雷射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_13', text : '淨膚雷射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_14', text : '玻尿酸填充注射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_15', text : '肉毒桿菌素注射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_16', text : '除皺抗老' },
			{ category: '醫療美容', name : 'cosmeticsurgery_17', text : '果酸換膚' },
			{ category: '醫療美容', name : 'cosmeticsurgery_18', text : '微晶瓷注射' },
			{ category: '醫療美容', name : 'cosmeticsurgery_19', text : '雷射溶脂' },
			{ category: '醫療美容', name : 'cosmeticsurgery_20', text : '超音波左旋C美白導入' },
			{ category: '醫療美容', name : 'cosmeticsurgery_21', text : '眼線' },
			{ category: '醫療美容', name : 'cosmeticsurgery_22', text : '紋眉' },
			{ category: '醫療美容', name : 'cosmeticsurgery_23', text : '除刺青' },
			{ category: '醫療美容', name : 'cosmeticsurgery_24', text : 'D聚左旋乳酸' },
			{ category: '醫療美容', name : 'cosmeticsurgery_25', text : '除痣' },
			{ category: '醫療美容', name : 'cosmeticsurgery_26', text : '除斑' },
			{ category: '醫療美容', name : 'cosmeticsurgery_27', text : '無痕縫線拉皮' },
			{ category: '醫療美容', name : 'cosmeticsurgery_28', text : '雙眼皮手術' },
			{ category: '醫療美容', name : 'cosmeticsurgery_29', text : '內開開眼頭' },
			{ category: '醫療美容', name : 'cosmeticsurgery_30', text : '外開開眼頭' },
			{ category: '醫療美容', name : 'cosmeticsurgery_31', text : '超音波溶脂' },
			{ category: '醫療美容', name : 'cosmeticsurgery_32', text : '狐臭內視鏡旋轉刀手術' }
        ])
		    .value('blogSortOptionList', [
            { name : '-created_at', text: '發表日期〈新到舊〉' },
            /*{ name : 'created_at', text: '發表日期〈舊到新〉' },*/
            { name : '-rating', text: '平均評分〈高到低〉' },
            /*{ name : 'rating', text: '平均評分〈低到高〉' },*/
            { name : '-click_count-0', text: '點擊數量〈高到低〉' }/*,
            { name : 'click_count-0', text: '點擊數量〈低到高〉' }*/
        ]);

})();
