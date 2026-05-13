<?php
/**
 * Plugin Name: Lilians Jewelry Consultant
 * Description: Interaktiv ringguide med poängbaserade rekommendationer, bildhantering och Amelia-integrering.
 * Version:     2.7.9
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'LJC_DIR', plugin_dir_path( __FILE__ ) );
define( 'LJC_URL', plugin_dir_url( __FILE__ ) );
define( 'LJC_VER', '2.7.9' );

// ── Register custom image size ─────────────────────────────────────────────
// 600×600 square crop — crisp on retina for quiz cards (~240 px display size)

add_action( 'init', 'ljc_register_image_sizes' );

function ljc_register_image_sizes() {
    add_image_size( 'ljc-card', 600, 600, true );
}

// ── Image group definitions ────────────────────────────────────────────────

function ljc_image_groups() {
    return [
        'Situationsval' => [
            'situation_surprise' => 'Överraskning',
            'situation_together' => 'Tillsammans',
            'situation_myself'   => 'Till mig själv',
        ],
        'Stil' => [
            'style_classic'  => 'Klassisk',
            'style_romantic' => 'Romantisk',
            'style_modern'   => 'Modern',
            'style_vintage'  => 'Vintage',
            'style_bold'     => 'Djärv',
            'style_nature'   => 'Naturinspirerad',
        ],
        'Livsstil' => [
            'life_active'   => 'Aktiv utomhus',
            'life_creative' => 'Kreativt skapande',
            'life_office'   => 'Social fjäril',
            'life_delicate' => 'Hem och interiör',
            'life_hands'    => 'Karriärfokuserad',
            'life_nature'   => 'Natur och djur',
        ],
        'Smyckevanor' => [
            'jewelry_lots'    => 'Mycket smycken',
            'jewelry_curated' => 'Utvalda bitar',
            'jewelry_rarely'  => 'Sällan smycken',
            'jewelry_warm'    => 'Varmtoniga',
            'jewelry_cool'    => 'Kyligtoniga',
            'jewelry_mixed'   => 'Blandad mix',
        ],
        'Stenform' => [
            'shape_round'    => 'Rund',
            'shape_oval'     => 'Oval',
            'shape_cushion'  => 'Cushion',
            'shape_pear'     => 'Päron',
            'shape_emerald'  => 'Emerald',
            'shape_princess' => 'Princess',
            'shape_marquise' => 'Marquise',
            'shape_asscher'  => 'Asscher',
            'shape_radiant'  => 'Radiant',
            'shape_heart'    => 'Hjärta',
        ],
        'Metall' => [
            'metal_yellow'   => 'Gult guld',
            'metal_rose'     => 'Roséguld',
            'metal_white'    => 'Vitguld',
            'metal_platinum' => 'Platina',
        ],
        'Infattning' => [
            'setting_solitaire'   => 'Klassisk solitär',
            'mount_cathedral'     => 'Cathedral',
            'mount_splitshank'    => 'Split shank',
            'setting_halo'        => 'Halo',
            'setting_bezel'       => 'Bezel',
            'setting_three_stone' => 'Tre stenar',
            'mount_cluster'       => 'Vintage cluster',
            'mount_floral'        => 'Naturinspirerat',
            'mount_eastwest'      => 'East-West',
        ],
        'Kramlor' => [
            'prong_4'      => '4 kramlor',
            'prong_6'      => '6 kramlor',
            'prong_double' => 'Dubbla kramlor',
            'prong_claw'   => 'Klokramlor',
            'prong_v'      => 'V-kramlor',
            'prong_bezel'  => 'Bezel',
        ],
        'Band' => [
            'band_plain'     => 'Slätt polerat',
            'band_pave'      => 'Pavé',
            'band_twisted'   => 'Tvinnat',
            'band_milgrain'  => 'Milgrain',
            'band_knifeedge' => 'Knife-edge',
            'band_engraved'  => 'Graverat',
            'band_floral'    => 'Blomdetalj',
            'band_split'     => 'Split shank',
        ],
        'Ringstorlek / känsla' => [
            'feel_delicate'  => 'Delikat',
            'feel_balanced'  => 'Balanserad',
            'feel_statement' => 'Statement',
        ],
        'Budget' => [
            'budget_low'     => 'Under 10 000 kr',
            'budget_mid'     => '10–25 000 kr',
            'budget_high'    => '25–50 000 kr',
            'budget_premium' => '50–100 000 kr',
            'budget_luxury'  => '100 000+ kr',
            'budget_open'    => 'Inte bestämt',
        ],
        'Stenavvägning' => [
            'stone_cut'     => 'Slipen',
            'stone_size'    => 'Storleken',
            'stone_clarity' => 'Klarheten',
            'stone_unique'  => 'Unik form',
        ],
        'Färgad sten' => [
            'stone_sapphire'   => 'Blå safir',
            'stone_padpar'     => 'Padparadscha',
            'stone_emerald'    => 'Smaragd',
            'stone_ruby'       => 'Rubin',
            'stone_morganite'  => 'Morganit',
            'stone_saltpepper' => 'Salt & Pepper',
            'stone_alex'       => 'Alexandrit',
        ],
        'Värderingar' => [
            'val_longevity' => 'Hållbarhet',
            'val_comfort'   => 'Bärbarhet',
            'val_unique'    => 'Unikhet',
            'val_sparkle'   => 'Maximal glans',
            'val_story'     => 'Berättelsen',
            'val_invest'    => 'Värdebeständighet',
        ],
        'Ringinspiration' => [
            'fullring_classic'    => 'Klassisk solitär',
            'fullring_romantic'   => 'Oval halo',
            'fullring_modern'     => 'Emerald bezel',
            'fullring_vintage'    => 'Cushion cluster',
            'fullring_nature'     => 'Naturinspirerad',
            'fullring_bold'       => 'Marquise halo',
            'fullring_minimalist' => 'Delikat solitär',
            'fullring_threestone' => 'Tre stenar',
            'fullring_splitshank' => 'Split shank oval',
        ],
    ];
}

// Helper: best available URL for a saved image attachment
function ljc_img_url( $att_id ) {
    if ( ! $att_id ) { return ''; }
    $url = wp_get_attachment_image_url( $att_id, 'ljc-card' );
    if ( ! $url ) { $url = wp_get_attachment_image_url( $att_id, 'large' ); }
    if ( ! $url ) { $url = wp_get_attachment_image_url( $att_id, 'full' ); }
    return $url ?: '';
}

// ── Question / card text definitions ──────────────────────────────────────
// Each entry: qid (JS key), name (admin label), title/sub defaults, opts array
// Each opt: [ id, default_label, default_sub, sub_field_key ]
// sub_field_key = 'sub' for most options, 'tip' for path-select tooltips

function ljc_question_defs() {
    return [
        [ 'qid'=>'path', 'name'=>'Situationsval (startfråga)',
          'title'=>'Hur väljer ni ringen?', 'sub'=>'Hjälper mig anpassa råden till er situation',
          'opts'=> [
            ['surprise','Som en överraskning',       'Jag handlar i hemlighet. Jag vägleder dig utifrån din partners personlighet och livsstil.','tip'],
            ['together','Vi väljer tillsammans',     'Ni väljer ihop — perfekt för att hitta exakt vad ni båda älskar.','tip'],
            ['myself',  'Till mig själv',            'Du vet vad du vill ha — låt oss finslipa detaljerna.','tip'],
        ]],
        [ 'qid'=>'aq1',  'name'=>'Sökväg A – Förfråga (Vad vet du redan?)',
          'title'=>'Hur mycket vet du redan om vad din partner vill ha?', 'sub'=>'Vi anpassar frågorna efter vad du redan känner till',
          'opts'=> [
            ['clear',  'Jag har en ganska klar bild — behöver bara hjälp med detaljerna', '','sub'],
            ['some',   'Jag vet lite men behöver vägledning för det mesta',               '','sub'],
            ['scratch','Jag börjar helt från noll — vägled mig hela vägen',               '','sub'],
        ]],
        [ 'qid'=>'a_checklist', 'name'=>'A – Checklista',
          'title'=>'Vad vet du redan?', 'sub'=>'Kryssa för det du redan känner till – vi ger dig bara frågor om resten',
          'opts'=> [
            ['metal',  'Metallfärg',       'Guld, silver, platina…','sub'],
            ['shape',  'Stenform',         'Rund, oval, cushion…','sub'],
            ['size',   'Storlek / känsla', 'Diskret eller statement','sub'],
            ['setting','Infattningsstil',  'Solitär, halo, bezel…','sub'],
            ['band',   'Banddetalj',       'Slätt, pavé, milgrain…','sub'],
            ['budget', 'Ungefärlig budget','','sub'],
        ]],
        [ 'qid'=>'metal', 'name'=>'Metall (delad fråga)',
          'title'=>'Vilket metall föredrar du?', 'sub'=>'Se swatch-bilderna – välj det som talar till dig',
          'opts'=> [
            ['yellowGold','Gult guld (18k)',    'Varmt, rikt, tidlöst','sub'],
            ['roseGold',  'Roséguld (18k)',     'Varmt, romantiskt, modern-vintage','sub'],
            ['whiteGold', 'Vitguld (18k)',      'Ljust, samtida, behöver omrhodning','sub'],
            ['platinum',  'Platina',            'Hållbarast, naturvitt, patineras vackert','sub'],
            ['mixed',     'Blandade metaller',  'Tvåton eller kontrast','sub'],
        ]],
        [ 'qid'=>'b_metal', 'name'=>'B – Metall (med hjälpalternativ)',
          'title'=>'Vilket metall föredrar du?', 'sub'=>'Se swatch-bilderna – välj det som talar till dig',
          'opts'=> [
            ['yellowGold','Gult guld (18k)',   'Varmt, rikt, tidlöst','sub'],
            ['roseGold',  'Roséguld (18k)',    'Varmt, romantiskt, modern-vintage','sub'],
            ['whiteGold', 'Vitguld (18k)',     'Ljust, samtida, behöver omrhodning','sub'],
            ['platinum',  'Platina',           'Hållbarast, naturvitt, patineras vackert','sub'],
            ['mixed',     'Blandade metaller', 'Tvåton eller kontrast','sub'],
            ['helpMetal', 'Hjälp mig välja',   'Vi guídar dig genom för- och nackdelar','sub'],
        ]],
        [ 'qid'=>'shape', 'name'=>'Stenform (delad fråga)',
          'title'=>'Vilken stenform lockar dig mest?', 'sub'=>'Välj upp till 2 former som tilltalar dig',
          'opts'=> [
            ['round',      'Rund',     'Mest brillians. Det klassiska.','sub'],
            ['oval',       'Oval',     'Förlänger fingret. Romantisk.','sub'],
            ['cushion',    'Cushion',  'Mjuka hörn. Vintage-värme.','sub'],
            ['pear',       'Päron',    'Droppform. Unik och graciös.','sub'],
            ['emeraldCut', 'Emerald',  'Stegslipning. Arkitektonisk.','sub'],
            ['princess',   'Princess', 'Kvadratisk. Modern glans.','sub'],
            ['marquise',   'Marquise', 'Ögonform. Djärv och unik.','sub'],
            ['asscher',    'Asscher',  'Art Deco. Halleffekt.','sub'],
            ['radiant',    'Radiant',  'Rektangulär briljant.','sub'],
            ['heart',      'Hjärta',   'Romantisk symbol.','sub'],
        ]],
        [ 'qid'=>'a_shape', 'name'=>'A – Stenform (partners preferens)',
          'title'=>'Vilken stenform passar din partner bäst?', 'sub'=>'Välj den form du känner sticker ut – eller att du inte vet ännu',
          'opts'=> [
            ['round',      'Rund',                                         'Mest brillians. Det klassiska.','sub'],
            ['oval',       'Oval',                                         'Förlänger fingret. Romantisk.','sub'],
            ['cushion',    'Cushion',                                      'Mjuka hörn. Vintage-värme.','sub'],
            ['pear',       'Päron',                                        'Droppform. Unik och graciös.','sub'],
            ['emeraldCut', 'Emerald',                                      'Stegslipning. Arkitektonisk.','sub'],
            ['princess',   'Princess',                                     'Kvadratisk. Modern glans.','sub'],
            ['marquise',   'Marquise',                                     'Ögonform. Djärv och unik.','sub'],
            ['asscher',    'Asscher',                                      'Art Deco. Halleffekt.','sub'],
            ['radiant',    'Radiant',                                      'Rektangulär briljant.','sub'],
            ['heart',      'Hjärta',                                       'Romantisk symbol.','sub'],
            ['notSure',    'Inte säker — de vill ha något unikt',          'Vi hjälper dig hitta formen','sub'],
        ]],
        [ 'qid'=>'mounting', 'name'=>'Infattning (delad fråga)',
          'title'=>'Vilken infattningsstil tilltalar dig?', 'sub'=>'Välj upp till 2 – infattningen formar hela ringens karaktär',
          'opts'=> [
            ['solitaire',  'Klassisk solitär',  'En sten. Ingenting annat.','sub'],
            ['cathedral',  'Cathedral solitär', 'Upphöjd och kunglig.','sub'],
            ['splitShank', 'Split shank',       'Banden delar sig mot stenen.','sub'],
            ['halo',       'Halo',              'Diamanter runt centerstenen.','sub'],
            ['bezel',      'Bezel',             'Metall runt stenen. Hållfast.','sub'],
            ['threeStone', 'Tre stenar',        'Förflutet, nutid, framtid.','sub'],
            ['cluster',    'Vintage cluster',   'Många stenar, ornamenterat.','sub'],
            ['floral',     'Naturinspirerat',   'Kronblad, löv, organiskt.','sub'],
            ['eastWest',   'East-West',         'Stenen liggande horisontellt.','sub'],
        ]],
        [ 'qid'=>'prong', 'name'=>'Kramlor (delad fråga)',
          'title'=>'Vilken typ av kramlor föredrar du?', 'sub'=>'Kramlornas form påverkar hur ljuset faller och ringens karaktär',
          'opts'=> [
            ['fourProng',   '4 kramlor',            'Minimalt metall. Mer sten synlig.','sub'],
            ['sixProng',    '6 kramlor',            'Mer säkert. Fylligare look.','sub'],
            ['doubleProng', 'Dubbla kramlor',       'Delikat och distinkt.','sub'],
            ['claw',        'Klokramlor',           'Maximalt ljus. Lite djärvare.','sub'],
            ['vProng',      'V-kramlor',            'Skyddar spetsiga stenar.','sub'],
            ['bezProng',    'Bezel (inga kramlor)', 'Ultramodern. Aldrig hakar.','sub'],
        ]],
        [ 'qid'=>'band', 'name'=>'Band (delad fråga)',
          'title'=>'Hur ska bandet se ut på nära håll?', 'sub'=>'Välj den detalj som tilltalar dig mest',
          'opts'=> [
            ['plain',     'Slätt polerat',     'Ingenting. Perfekt.','sub'],
            ['pave',      'Pavé',              'Diamanter längs bandet.','sub'],
            ['twisted',   'Tvinnat / flätat',  'Romantiskt och unikt.','sub'],
            ['milgrain',  'Milgrain',          'Pärlad kant – antik känsla.','sub'],
            ['knifeEdge', 'Knife-edge',        'Skarp rygg – rent och modernt.','sub'],
            ['engraved',  'Graverat mönster',  'Geometrisk eller floral gravyr.','sub'],
            ['florBand',  'Blom- / bladdetalj','Organisk naturtextur.','sub'],
            ['split',     'Split shank',       'Bandet delar sig mot stenen.','sub'],
        ]],
        [ 'qid'=>'feel', 'name'=>'Ringkänsla (delad fråga)',
          'title'=>'Hur stor närvaro ska ringen ha?', 'sub'=>'Välj den känsla som stämmer med vad du söker',
          'opts'=> [
            ['delicate',  'Delikat och diskret', 'Ringen ska viska','sub'],
            ['balanced',  'Balanserad',           'Synlig men inte överväldigande','sub'],
            ['statement', 'Statement-smycke',     'Ringen ska ta plats i rummet','sub'],
        ]],
        [ 'qid'=>'budget', 'name'=>'Budget (delad fråga)',
          'title'=>'Vad är din ungefärliga budget?', 'sub'=>'Hjälper oss prioritera rätt sten och material',
          'opts'=> [
            ['tier1','Under 10 000 kr',   'Labbdiamanter, moissanit','sub'],
            ['tier2','10 000–25 000 kr',  'Labbdiamant, bra kvalitet','sub'],
            ['tier3','25 000–50 000 kr',  'Naturlig diamant, certifikat','sub'],
            ['tier4','50 000–100 000 kr', 'Premium diamant, platina','sub'],
            ['tier5','100 000+ kr',        'Exceptionellt, full custom','sub'],
            ['flex', 'Inte bestämt ännu', 'Visa mig vad pengarna gör','sub'],
        ]],
        [ 'qid'=>'a_style', 'name'=>'A – Stil (partners personlighet)',
          'title'=>'Beskriv din partners personliga stil', 'sub'=>'Välj det alternativ som stämmer bäst',
          'opts'=> [
            ['classic', 'Klassisk och elegant',           'Välklädd, tidlös, aldrig trendkänslig','sub'],
            ['romantic','Romantisk och feminin',           'Mjuk, blommig, naturligt vacker','sub'],
            ['modern',  'Modern och minimalistisk',        'Rena linjer, kvalitet framför kvantitet','sub'],
            ['vintage', 'Vintage och eklektisk',           'Unika fynd, mix av tidsepoker','sub'],
            ['bold',    'Djärv och uttrycksfull',          'Gör statement, älskar mode och färg','sub'],
            ['nature',  'Naturinspirerad och konstnärlig', 'Organiska former, hantverkskänsla','sub'],
        ]],
        [ 'qid'=>'a_lifestyle', 'name'=>'A – Livsstil (partners fritid)',
          'title'=>'Vad gör din partner på fritiden?', 'sub'=>'Hjälper oss välja rätt hållbarhet och form',
          'opts'=> [
            ['active',  'Aktiv utomhus',     'Vandring, klättring, löpning, resor','sub'],
            ['creative','Kreativt skapande', 'Målning, keramik, musik, design','sub'],
            ['social',  'Social fjäril',     'Restauranger, evenemang, umgänge','sub'],
            ['home',    'Hem och intriör',   'Matlagning, inredning, värdskap','sub'],
            ['career',  'Karriärfokuserad',  'Professionell, ambitiös, strukturerad','sub'],
            ['nature2', 'Natur och djur',    'Trädgård, hästar, hållbarhet','sub'],
        ]],
        [ 'qid'=>'a_jewelry', 'name'=>'A – Smyckevanor (partner)',
          'title'=>'Vilka smycken bär din partner vanligtvis?', 'sub'=>'Ger oss ledtådar om metall och stil',
          'opts'=> [
            ['lots',     'Mycket smycken',      'Staplar, lager, alltid något på','sub'],
            ['curated',  'Utvalda bitar',        'Kvalitet framför kvantitet','sub'],
            ['rarely',   'Sällan smycken',       'Håller det enkelt','sub'],
            ['warmTone', 'Varmtoniga smycken',   'Guld, mässing, brons','sub'],
            ['coolTone', 'Kyligtoniga smycken',  'Vitguld, silver, platina','sub'],
            ['mixedJew', 'Blandad mix',           'Eklektisk och oförutsägbar','sub'],
        ]],
        [ 'qid'=>'a_height', 'name'=>'A – Ringhöjd',
          'title'=>'Hur högt ska ringen sitta på fingret?', 'sub'=>'Infattningshöjden påverkar komfort och karaktär',
          'opts'=> [
            ['low',    'Lågt och diskret',   'Knappt upphöjd över fingret','sub'],
            ['mid',    'Lite upphöjd',        'Synlig men inte dramatisk','sub'],
            ['high',   'Högt och prominent',  'Stenen i fokus, hjälteplacering','sub'],
            ['notsure','Inte säker',          'Inga poäng – fortsätt','sub'],
        ]],
        [ 'qid'=>'a_shape_personality', 'name'=>'A – Stenform via personlighet',
          'title'=>'Vi hjälper dig hitta formen genom personligheten', 'sub'=>'Vilken mening stämmer bäst med din partner?',
          'opts'=> [
            ['sp_timeless','"De väljer aldrig något för att det är trendig."','','sub'],
            ['sp_soft',    '"De älskar mjuka, flödande saker — inget skarpt."','','sub'],
            ['sp_geo',     '"De dras till geometrisk precision och rena linjer."','','sub'],
            ['sp_stand',   '"De gillar att sticka ut — det oväntade valet."','','sub'],
            ['sp_romantic','"De är romantiska — allt har en betydelse för dem."','','sub'],
        ]],
        [ 'qid'=>'a_words', 'name'=>'A – Ord som beskriver partnern',
          'title'=>'Välj 2 ord som bäst beskriver din partner', 'sub'=>'Välj exakt 2 ord',
          'opts'=> [
            ['elegant',       'Elegant','','sub'],
            ['dreamy',        'Drömsk','','sub'],
            ['strong',        'Stark','','sub'],
            ['artistic',      'Konstnärlig','','sub'],
            ['understated',   'Avskalad','','sub'],
            ['warm',          'Varm','','sub'],
            ['sophisticated', 'Sofistikerad','','sub'],
            ['freespirit',    'Fri ande','','sub'],
            ['playful',       'Lekfull','','sub'],
            ['quiet',         'Stilla styrka','','sub'],
        ]],
        [ 'qid'=>'a_final', 'name'=>'A – Sista känslokontrollen',
          'title'=>'Sista känslokontrollen – vilken ring känns mest som din partner?', 'sub'=>'Välj utan att tänka för länge',
          'opts'=> [
            ['fClassic', 'Klassisk rund solitär, platina','','sub'],
            ['fRomantic','Oval halo, roséguld, pavé-band','','sub'],
            ['fModern',  'Emerald bezel, vitguld, knife-edge','','sub'],
            ['fVintage', 'Cushion cluster, gult guld, milgrain','','sub'],
            ['fNature',  'Päron i naturinspirerat band','','sub'],
            ['fBold',    'Marquise dubbelhalo, pavé överallt','','sub'],
        ]],
        [ 'qid'=>'b_priority', 'name'=>'B – Stensatt prioritet',
          'title'=>'Vad är viktigast för er i själva stenen?', 'sub'=>'Välj det som väger tyngst',
          'opts'=> [
            ['cut',         'Slipen',         'Hur den fångar ljuset är allt','sub'],
            ['size',        'Storleken',      'Vi vill att den syns tydligt','sub'],
            ['clarity',     'Klarheten',      'Ren, isklar, inga inneslutningar','sub'],
            ['uniqueShape', 'Unik form',      'Något som sticker ut','sub'],
            ['colorStone',  'Färgad sten',    'Öppna för saffír, rubin, smaragd…','sub'],
            ['ethical',     'Etiskt ursprung','Labbdiamant eller certifierat','sub'],
        ]],
        [ 'qid'=>'b_metal_guide1', 'name'=>'B – Metallguide (del 1, vad är viktigast?)',
          'title'=>'Vad är viktigast för er i metallen?', 'sub'=>'Hjälper oss rekommendera rätt material',
          'opts'=> [
            ['durability','Hållbarhet — ska hålla för evigt utan underhåll','','sub'],
            ['warmth',    'Värme i färgen — ska kännas dyrbar och rik','','sub'],
            ['brightness','Maximal ljusstyrka — diamanter ska lysa så mycket som möjligt','','sub'],
            ['romantic2', 'Romantisk, feminin kvalité i metallen själv','','sub'],
            ['prestige',  'Klassisk prestige','','sub'],
        ]],
        [ 'qid'=>'b_metal_guide2', 'name'=>'B – Metallguide (del 2, hudton)',
          'title'=>'Hudton (valfritt men hjälpsamt)', 'sub'=>'Vissa metaller kompletterar hudtoner extra väl',
          'opts'=> [
            ['cool','Ljus / kyligtonig hudton',  'Kyla metaller kledsäl','sub'],
            ['warm','Medium / varmtonig hudton', 'Varma metaller kompletterar','sub'],
            ['deep','Mörk / djup hudton',        'Kontrasten blir fantastisk','sub'],
            ['skip','Inget svar / inte relevant','','sub'],
        ]],
        [ 'qid'=>'b_colored_stone', 'name'=>'B – Färgad sten',
          'title'=>'Vilken färgad sten talar till er?', 'sub'=>'Varje sten har en unik karaktär',
          'opts'=> [
            ['sapphire',   'Blå saffír',            'Djup, kunglig, tidlös','sub'],
            ['padpar',     'Padparadscha saffír',    'Persikoro, extremt sällsynt','sub'],
            ['emerald',    'Smaragd',                'Djupt grön, överflödig','sub'],
            ['ruby',       'Rubin',                  'Röd, passionerad, dramatisk','sub'],
            ['morganite',  'Morganit',               'Mjukt persiko-rosa, feminint','sub'],
            ['saltpepper', 'Salt & Pepper diamant',  'Rå, modern, unik','sub'],
            ['alexandrite','Alexandrit',             'Färgskiftande, magisk','sub'],
        ]],
        [ 'qid'=>'b_ethical', 'name'=>'B – Ursprung / etik',
          'title'=>'Vad är viktigast för er gällande ursprung?', 'sub'=>'Alla alternativ ger en vacker ring – det handlar om era värderingar',
          'opts'=> [
            ['labgrown', 'Labbodlad diamant — identisk look, inget gruvarbete, bra värde','','sub'],
            ['certified','Certifierad naturlig diamant (GIA, konfliktfri)','','sub'],
            ['recycled', 'Återvunnet metall och vintage-stenar','','sub'],
            ['traceable','Spårbart ursprung (kanadensisk eller australisk)','','sub'],
        ]],
        [ 'qid'=>'b_values', 'name'=>'B – Värderingar',
          'title'=>'Vad är viktigast utöver utseendet?', 'sub'=>'Välj det som väger tyngst för er',
          'opts'=> [
            ['longevity', 'Livslång hållbarhet','Ska hålla livet ut','sub'],
            ['comfort',   'Bärbarhet',          'Bekväm varje dag','sub'],
            ['unique2',   'Unikhet',            'Ingen annan har likadant','sub'],
            ['sparkle',   'Maximal glans',      'Brillians och gnist','sub'],
            ['story',     'Berättelsen',        'Mening och symbolik','sub'],
            ['investment','Värdebeständighet',  'Håller sitt värde över tid','sub'],
        ]],
        [ 'qid'=>'cq1', 'name'=>'Sökväg C – Förfråga (Var börjar du?)',
          'title'=>'Var börjar du idag?', 'sub'=>'Hjälper mig anpassa upplevelsen efter dig',
          'opts'=> [
            ['vision',    'Jag har en klar vision — behöver hjälp med detaljerna','','sub'],
            ['direction', 'Jag har en allmän riktning men vill utforska','','sub'],
            ['surprise',  'Jag vill bli överraskad — guidemig utifrån min personlighet','','sub'],
            ['reference', 'Jag har en referensbild eller ring jag älskar','','sub'],
        ]],
        [ 'qid'=>'c_checklist', 'name'=>'C – Checklista',
          'title'=>'Vad vet du redan om din ring?', 'sub'=>'Kryssa för det du redan vet – vi frågar bara om resten',
          'opts'=> [
            ['metal',  'Metallfärg',       'Guld, silver, platina…','sub'],
            ['shape',  'Stenform',         'Rund, oval, cushion…','sub'],
            ['size',   'Storlek / känsla', 'Diskret eller statement','sub'],
            ['setting','Infattningsstil',  'Solitär, halo, bezel…','sub'],
            ['band',   'Banddetalj',       'Slätt, pavé, milgrain…','sub'],
            ['budget', 'Ungefärlig budget','','sub'],
        ]],
        [ 'qid'=>'c_style', 'name'=>'C – Personlig stil',
          'title'=>'Hur skulle du beskriva din personliga stil?', 'sub'=>'Välj det alternativ som stämmer bäst',
          'opts'=> [
            ['classic', 'Klassisk och genomtänkt',          'Jag investerar i tidlöst','sub'],
            ['romantic','Romantisk',                        'Jag dras till mjukt, vackert, emotionellt','sub'],
            ['minimal', 'Minimalistisk',                    'Jag äger mindre men bättre','sub'],
            ['vintage', 'Vintage',                         'Jag älskar saker med historia','sub'],
            ['bold',    'Djärv',                            'Jag klär mig för att synas','sub'],
            ['nature',  'Natur och konstnärlig',            'Organiskt, handgjort, jordnära','sub'],
            ['dontKnow','Jag vet ärligt talat inte — det växlar','Vi hjälper dig','sub'],
        ]],
        [ 'qid'=>'c_lifestyle_q', 'name'=>'C – Livsstil',
          'title'=>'Hur ser din vardag ut?', 'sub'=>'Hjälper oss förstå vilken stil och hållbarhet som passar',
          'opts'=> [
            ['active2',     'Väldigt aktiv — händerna är alltid i rörelse, utomhus, sport','','sub'],
            ['professional','Professionell — möten, kontor, ser representativ ut','','sub'],
            ['creative2',   'Kreativ — atelje, verkstad, händerna i material','','sub'],
            ['social2',     'Social — många tillfällen, middagar, evenemang','','sub'],
            ['allAbove',    'Allt ovanstående — den måste fungera överallt','','sub'],
        ]],
        [ 'qid'=>'c_statement', 'name'=>'C – Meningskontroll',
          'title'=>'Vilken mening känns som du?', 'sub'=>'Välj utan att tänka för länge',
          'opts'=> [
            ['st_classic', '"Min ring ska se likadan ut om 50 år som idag."','','sub'],
            ['st_romantic','"Jag vill se på den och känna något varje gång."','','sub'],
            ['st_minimal', '"Mindre är mer. Åtehållsamheten är poängen."','','sub'],
            ['st_vintage', '"Jag vill ha något som berättar en historia."','','sub'],
            ['st_bold',    '"Jag vill att folk lägger märke till den."','','sub'],
            ['st_nature',  '"Den ska kännas som den kom från naturen."','','sub'],
            ['st_modern',  '"Jag vill ha det vackraste, mest precisa jag äger."','','sub'],
        ]],
    ];
}

// ── Style profile definitions ──────────────────────────────────────────────
// Mirrors JS PROFILES object — used for admin UI placeholders

function ljc_profile_defs() {
    return [
        'classic'    => [ 'label'=>'Klassisk',      'fields'=>[
            'name'     => 'Klassisk',
            'quote'    => 'Tidlöst är inte tråkigt — det är avsiktligt. Den ring folk känner igen i samma ögonblick de ser den.',
            'stone'    => 'Rund briljant, ideal eller excellent slipning',
            'mounting' => 'Solitär eller cathedral solitär',
            'prongs'   => '6 kramlor (Tiffany) eller 4 kramlor',
            'band'     => 'Slätt polerat, knife-edge eller lätt graverat',
            'metal'    => 'Platina eller 18k gult guld',
            'carat'    => 'Kvalitet framför storlek — 0,8–1,5 ct',
        ]],
        'romantic'   => [ 'label'=>'Romantisk',     'fields'=>[
            'name'     => 'Romantisk',
            'quote'    => 'Gjord för att beundras från andra sidan rummet. Full av känsla.',
            'stone'    => 'Oval, päron eller hjärta',
            'mounting' => 'Halo, pavé-cathedral eller floating solitär',
            'prongs'   => 'Dubbla kramlor eller 4 kramlor',
            'band'     => 'Pavé, tvinnat eller split shank med diamanter',
            'metal'    => 'Roséguld 18k eller vitguld',
            'carat'    => '1,0–2,0 ct — halo gör stenen visuellt större',
        ]],
        'modern'     => [ 'label'=>'Modern',        'fields'=>[
            'name'     => 'Modern',
            'quote'    => 'Stilla radikal. Ser ut att höra hemma på ett designmuseum.',
            'stone'    => 'Emerald, princess eller asscher',
            'mounting' => 'Bezel eller east-west',
            'prongs'   => 'Full bezel (inga kramlor) eller minimal 4-kramla',
            'band'     => 'Knife-edge, slätt eller arkitektonisk detalj',
            'metal'    => 'Platina eller vitguld 18k',
            'carat'    => '1,0–1,5 ct — klarhet är nyckeln i stegslipen',
        ]],
        'vintage'    => [ 'label'=>'Vintage',       'fields'=>[
            'name'     => 'Vintage',
            'quote'    => 'Rik på detaljer. Oersättlig. Som om den hittades, inte köptes.',
            'stone'    => 'Cushion, old European cut, asscher eller rose cut',
            'mounting' => 'Cluster, filigran solitär eller milgrain halo',
            'prongs'   => 'Klokramlor eller dubbla kramlor med vintagedetaljer',
            'band'     => 'Milgrain-kant, graverat eller blomdetalj',
            'metal'    => '18k gult guld (varmast till vintagekänsla)',
            'carat'    => '0,8–1,5 ct — vintageslipningar verkar större',
        ]],
        'minimalist' => [ 'label'=>'Minimalistisk', 'fields'=>[
            'name'     => 'Minimalistisk',
            'quote'    => 'Det mest genomtänkta valet du aldrig behöver förklara.',
            'stone'    => 'Rund eller oval, mindre men oantastlig slipning',
            'mounting' => 'Ultratunn solitär eller half-bezel',
            'prongs'   => '4 minimal-kramla eller fin bezel',
            'band'     => 'Ultratunn slät band, 1,2–1,5 mm',
            'metal'    => 'Platina (mest förfinat) eller vitguld',
            'carat'    => '0,5–1,0 ct — kvalitet är allt',
        ]],
        'bold'       => [ 'label'=>'Djärv',         'fields'=>[
            'name'     => 'Djärv',
            'quote'    => 'Inte för den avskalade. Varje rum märker den.',
            'stone'    => 'Marquise, päron (stor) eller oval (stor)',
            'mounting' => 'Dubbelhalo eller hög cathedral',
            'prongs'   => 'Klokramlor eller V-kramlor',
            'band'     => 'Full pavé eller brett slätt band',
            'metal'    => 'Valfritt — kontrasten mellan metall och sten är det viktiga',
            'carat'    => '1,5 ct+ — närvaro är målet',
        ]],
        'nature'     => [ 'label'=>'Natur',         'fields'=>[
            'name'     => 'Natur',
            'quote'    => 'Organisk. Levande. Som om den växte fram snarare än tillverkades.',
            'stone'    => 'Päron, rose cut eller oval',
            'mounting' => 'Blomm-/kronbladsinfattning, naturinspirerat cluster',
            'prongs'   => 'Dubbla kramlor, klokramlor eller organiska specialkramlor',
            'band'     => 'Blomgraverat, lövdetalj eller tvinnat band',
            'metal'    => '18k gult guld eller roséguld',
            'carat'    => 'Form och infattning bär mer än storleken',
        ]],
    ];
}

// ── Leads table ────────────────────────────────────────────────────────────

function ljc_create_leads_table() {
    global $wpdb;
    $table   = $wpdb->prefix . 'ljc_leads';
    $charset = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE IF NOT EXISTS {$table} (
        id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        name varchar(100) DEFAULT '',
        email varchar(100) DEFAULT '',
        path varchar(2) NOT NULL DEFAULT '',
        style_primary varchar(20) DEFAULT '',
        style_secondary varchar(20) DEFAULT '',
        metal varchar(20) DEFAULT '',
        shape varchar(20) DEFAULT '',
        mounting varchar(20) DEFAULT '',
        prong varchar(20) DEFAULT '',
        band varchar(20) DEFAULT '',
        feel varchar(20) DEFAULT '',
        budget varchar(20) DEFAULT '',
        booked tinyint(1) DEFAULT 0,
        PRIMARY KEY (id)
    ) {$charset};";
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta( $sql );
}

// Run upgrades on every load — dbDelta + ALTER TABLE are idempotent
add_action( 'plugins_loaded', 'ljc_maybe_upgrade' );
function ljc_maybe_upgrade() {
    if ( get_option( 'ljc_db_version', '0' ) !== '2.6.0' ) {
        ljc_create_leads_table();
        // Add new columns to existing tables (dbDelta may not add columns reliably)
        global $wpdb;
        $table = $wpdb->prefix . 'ljc_leads';
        $cols  = $wpdb->get_col( "SHOW COLUMNS FROM {$table}" );
        if ( $cols && ! in_array( 'name',   $cols, true ) ) { $wpdb->query( "ALTER TABLE {$table} ADD COLUMN `name`   varchar(100) DEFAULT '' AFTER `created_at`" ); }
        if ( $cols && ! in_array( 'email',  $cols, true ) ) { $wpdb->query( "ALTER TABLE {$table} ADD COLUMN `email`  varchar(100) DEFAULT '' AFTER `name`" ); }
        if ( $cols && ! in_array( 'booked', $cols, true ) ) { $wpdb->query( "ALTER TABLE {$table} ADD COLUMN `booked` tinyint(1) DEFAULT 0 AFTER `budget`" ); }
        update_option( 'ljc_db_version', '2.6.0' );
    }
}

// ── Activation: create the consultation page ───────────────────────────────

register_activation_hook( __FILE__, 'ljc_activate' );

function ljc_activate() {
    $slug = 'smyckeskonsultation';
    if ( ! get_page_by_path( $slug ) ) {
        wp_insert_post( [
            'post_title'   => 'Smyckeskonsultation',
            'post_name'    => $slug,
            'post_content' => '[ljc_quiz]',
            'post_status'  => 'publish',
            'post_type'    => 'page',
        ] );
    }
    ljc_create_leads_table();
    update_option( 'ljc_db_version', '2.6.0' );
}

// ── Shortcode ──────────────────────────────────────────────────────────────

add_shortcode( 'ljc_quiz', 'ljc_quiz_shortcode' );
function ljc_quiz_shortcode() { return '<div id="ljc-quiz"></div>'; }

// ── Enqueue quiz assets ────────────────────────────────────────────────────

add_action( 'wp_enqueue_scripts', 'ljc_enqueue' );

function ljc_enqueue() {
    if ( ! is_page( 'smyckeskonsultation' ) ) { return; }

    wp_enqueue_style( 'ljc-google-fonts',
        'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Poppins:wght@400;500;600&display=swap',
        [], null );

    wp_enqueue_style( 'ljc-quiz', LJC_URL . 'assets/quiz.css', [ 'ljc-google-fonts' ], filemtime( LJC_DIR . 'assets/quiz.css' ) );
    wp_enqueue_script( 'ljc-quiz', LJC_URL . 'assets/quiz.js', [], filemtime( LJC_DIR . 'assets/quiz.js' ), true );

    // Build images map — uses ljc-card (600×600) → large → full fallback chain
    $images = [];
    foreach ( ljc_image_groups() as $group ) {
        foreach ( $group as $key => $label ) {
            $att_id = (int) get_option( 'ljc_img_' . $key, 0 );
            $url    = ljc_img_url( $att_id );
            if ( $url ) { $images[ $key ] = $url; }
        }
    }

    // Build strings map — only non-empty overrides are included (keeps payload compact)
    $strings = [];
    foreach ( ljc_question_defs() as $qdef ) {
        $qid = $qdef['qid'];
        $v   = get_option( 'ljc_str_' . $qid . '_title', '' );
        if ( $v !== '' ) { $strings[ $qid . '_title' ] = $v; }
        $v   = get_option( 'ljc_str_' . $qid . '_sub', '' );
        if ( $v !== '' ) { $strings[ $qid . '_sub' ] = $v; }
        foreach ( $qdef['opts'] as $opt ) {
            $oid   = $opt[0];
            $field = $opt[3]; // 'sub' or 'tip'
            $vl    = get_option( 'ljc_str_' . $qid . '_' . $oid . '_label', '' );
            if ( $vl !== '' ) { $strings[ $qid . '_' . $oid . '_label' ] = $vl; }
            $vs    = get_option( 'ljc_str_' . $qid . '_' . $oid . '_' . $field, '' );
            if ( $vs !== '' ) { $strings[ $qid . '_' . $oid . '_' . $field ] = $vs; }
        }
    }

    // Build profile overrides — only non-empty values
    $profiles = [];
    foreach ( ljc_profile_defs() as $key => $pdef ) {
        $ov = [];
        foreach ( $pdef['fields'] as $field => $default ) {
            $v = get_option( 'ljc_prof_' . $key . '_' . $field, '' );
            if ( $v !== '' ) { $ov[ $field ] = $v; }
        }
        if ( ! empty( $ov ) ) { $profiles[ $key ] = $ov; }
    }

    // Build ring recommendations — only profiles that have at least one ring
    $rings = [];
    foreach ( array_keys( ljc_profile_defs() ) as $key ) {
        $arr = [];
        for ( $n = 1; $n <= 3; $n++ ) {
            $name   = get_option( 'ljc_ring_' . $key . '_' . $n . '_name', '' );
            $url    = get_option( 'ljc_ring_' . $key . '_' . $n . '_url',  '' );
            $img_id = (int) get_option( 'ljc_ring_' . $key . '_' . $n . '_img', 0 );
            $img    = $img_id ? ljc_img_url( $img_id ) : get_option( 'ljc_ring_' . $key . '_' . $n . '_imgurl', '' );
            if ( $name || $url ) { $arr[] = [ 'name' => $name, 'url' => $url, 'img' => $img ]; }
        }
        if ( ! empty( $arr ) ) { $rings[ $key ] = $arr; }
    }

    wp_localize_script( 'ljc-quiz', 'LJC', [
        'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
        'nonce'     => wp_create_nonce( 'ljc_nonce' ),
        'imgBase'   => LJC_URL . 'images/',
        'ameliaUrl' => esc_url( get_option( 'ljc_amelia_url', '/boka/' ) ),
        'images'    => $images,
        'welcome'   => [
            'title' => get_option( 'ljc_welcome_title', 'Hitta din perfekta ring' ),
            'desc'  => get_option( 'ljc_welcome_desc', '' ),
        ],
        'strings'   => $strings,
        'profiles'  => $profiles,
        'rings'     => $rings,
    ] );
}

// ── Enqueue admin assets ───────────────────────────────────────────────────

add_action( 'admin_enqueue_scripts', 'ljc_admin_enqueue' );

function ljc_admin_enqueue( $hook ) {
    if ( $hook !== 'toplevel_page_ljc-settings' ) { return; }
    $tab = isset( $_GET['tab'] ) ? sanitize_key( $_GET['tab'] ) : 'general';
    if ( in_array( $tab, [ 'images', 'rings' ], true ) ) {
        wp_enqueue_media();
    }
    wp_enqueue_style( 'ljc-admin', LJC_URL . 'assets/admin.css', [], LJC_VER );
}

// ── Body class on quiz page ────────────────────────────────────────────────

add_filter( 'body_class', 'ljc_body_class' );

function ljc_body_class( $classes ) {
    if ( is_page( 'smyckeskonsultation' ) ) { $classes[] = 'ljc-quiz-page'; }
    return $classes;
}

// ── Floating button ────────────────────────────────────────────────────────

add_action( 'wp_footer', 'ljc_float_button' );

function ljc_float_button() {
    if ( is_page( 'smyckeskonsultation' ) ) { return; }
    if ( ! get_option( 'ljc_bubble_enabled', '1' ) ) { return; }
    $page = get_page_by_path( 'smyckeskonsultation' );
    if ( ! $page ) { return; }
    $url          = esc_url( get_permalink( $page->ID ) );
    $bubble_text  = esc_html( get_option( 'ljc_bubble_text',  'Hitta din drömring med vår ringguide' ) );
    $bubble_emoji = esc_html( get_option( 'ljc_bubble_emoji', '💍' ) );
    ?>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap">
    <link rel="stylesheet" href="<?php echo LJC_URL; ?>assets/quiz.css?ver=<?php echo LJC_VER; ?>">
    <div id="ljc-float-wrap">
      <div id="ljc-float-bubble">
        <span><?php echo $bubble_text; ?></span>
        <button id="ljc-bubble-close" aria-label="St&auml;ng" type="button">&#215;</button>
      </div>
      <a id="ljc-float-btn" href="<?php echo $url; ?>" aria-label="Starta ringguide"><?php echo $bubble_emoji; ?></a>
    </div>
    <script>
    (function () {
      var KEY = 'ljc_bubble_dismissed';
      var bubble = document.getElementById('ljc-float-bubble');
      var close  = document.getElementById('ljc-bubble-close');
      if ( ! bubble ) { return; }
      if ( localStorage.getItem( KEY ) ) { bubble.classList.add('ljc-bubble-hidden'); return; }
      close.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        bubble.classList.add('ljc-bubble-hidden');
        localStorage.setItem( KEY, '1' );
      });
    })();
    </script>
    <?php
}

// ── AJAX: save anonymous lead when results are shown ──────────────────────

add_action( 'wp_ajax_nopriv_ljc_lead', 'ljc_save_lead' );
add_action( 'wp_ajax_ljc_lead',        'ljc_save_lead' );

function ljc_save_lead() {
    if ( ! check_ajax_referer( 'ljc_nonce', 'nonce', false ) ) {
        wp_send_json_error( 'nonce' );
    }
    global $wpdb;
    $table = $wpdb->prefix . 'ljc_leads';
    $wpdb->insert( $table, [
        'path'            => sanitize_text_field( $_POST['path']            ?? '' ),
        'style_primary'   => sanitize_text_field( $_POST['style_primary']   ?? '' ),
        'style_secondary' => sanitize_text_field( $_POST['style_secondary'] ?? '' ),
        'metal'           => sanitize_text_field( $_POST['metal']           ?? '' ),
        'shape'           => sanitize_text_field( $_POST['shape']           ?? '' ),
        'mounting'        => sanitize_text_field( $_POST['mounting']        ?? '' ),
        'prong'           => sanitize_text_field( $_POST['prong']           ?? '' ),
        'band'            => sanitize_text_field( $_POST['band']            ?? '' ),
        'feel'            => sanitize_text_field( $_POST['feel']            ?? '' ),
        'budget'          => sanitize_text_field( $_POST['budget']          ?? '' ),
    ] );
    // Return the new row ID so JS can reference it when the customer books
    wp_send_json_success( [ 'lead_id' => (int) $wpdb->insert_id ] );
}

// ── AJAX: customer books — attach name/email and send admin notification ──

add_action( 'wp_ajax_nopriv_ljc_book', 'ljc_book' );
add_action( 'wp_ajax_ljc_book',        'ljc_book' );

function ljc_book() {
    if ( ! check_ajax_referer( 'ljc_nonce', 'nonce', false ) ) {
        wp_send_json_error( 'Säkerhetsfel' );
    }

    $name    = sanitize_text_field( $_POST['name']  ?? '' );
    $email   = sanitize_email(      $_POST['email'] ?? '' );
    $lead_id = (int)               ( $_POST['lead_id'] ?? 0 );

    if ( ! is_email( $email ) ) {
        wp_send_json_error( 'Ogiltig e-postadress' );
    }

    $path    = sanitize_text_field( $_POST['path']            ?? '' );
    $style1  = sanitize_text_field( $_POST['style_primary']   ?? '' );
    $style2  = sanitize_text_field( $_POST['style_secondary'] ?? '' );
    $metal   = sanitize_text_field( $_POST['metal']           ?? '' );
    $shape   = sanitize_text_field( $_POST['shape']           ?? '' );
    $mount   = sanitize_text_field( $_POST['mounting']        ?? '' );
    $prong   = sanitize_text_field( $_POST['prong']           ?? '' );
    $band    = sanitize_text_field( $_POST['band']            ?? '' );
    $feel    = sanitize_text_field( $_POST['feel']            ?? '' );
    $budget  = sanitize_text_field( $_POST['budget']          ?? '' );

    // Update the existing anonymous lead row, or insert if missing
    global $wpdb;
    $table = $wpdb->prefix . 'ljc_leads';
    if ( $lead_id ) {
        $wpdb->update( $table, [ 'name' => $name, 'email' => $email, 'booked' => 1 ], [ 'id' => $lead_id ] );
    } else {
        $wpdb->insert( $table, [
            'name' => $name, 'email' => $email, 'booked' => 1,
            'path' => $path, 'style_primary' => $style1, 'style_secondary' => $style2,
            'metal' => $metal, 'shape' => $shape, 'mounting' => $mount,
            'prong' => $prong, 'band' => $band, 'feel' => $feel, 'budget' => $budget,
        ] );
    }

    // Build admin notification email
    $path_labels = [ 'A' => 'Överraskning', 'B' => 'Vi väljer tillsammans', 'C' => 'Till mig själv' ];
    $sep  = str_repeat( '-', 46 );
    $body = "Ny ringkonsultation – kunden vill boka!\n\n";
    $body .= "$sep\nKUNDUPPGIFTER\n$sep\n";
    $body .= "Namn:      $name\n";
    $body .= "E-post:    $email\n\n";
    $body .= "$sep\nRINGPROFIL\n$sep\n";
    $body .= sprintf( "%-22s %s\n", "Sökväg:",       $path_labels[ $path ] ?? $path );
    $body .= sprintf( "%-22s %s\n", "Primär stil:",   $style1 );
    if ( $style2 ) { $body .= sprintf( "%-22s %s\n", "Sekundär stil:",  $style2 ); }
    $body .= sprintf( "%-22s %s\n", "Metall:",        $metal );
    $body .= sprintf( "%-22s %s\n", "Stenform:",      $shape );
    $body .= sprintf( "%-22s %s\n", "Infattning:",    $mount );
    $body .= sprintf( "%-22s %s\n", "Kramlor:",       $prong );
    $body .= sprintf( "%-22s %s\n", "Band:",          $band );
    $body .= sprintf( "%-22s %s\n", "Känsla:",        $feel );
    $body .= sprintf( "%-22s %s\n", "Budget:",        $budget );
    $body .= "\n$sep\nSkickat automatiskt från Lilian's Ringguide\n";

    wp_mail(
        get_option( 'admin_email' ),
        "Ny bokning från ringguiden – $name",
        $body,
        [
            'Content-Type: text/plain; charset=UTF-8',
            "Reply-To: $name <$email>",
        ]
    );

    wp_send_json_success();
}

// ── CSV export ─────────────────────────────────────────────────────────────

add_action( 'admin_init', 'ljc_maybe_export_csv' );

function ljc_maybe_export_csv() {
    if ( ! isset( $_GET['page'], $_GET['ljc_export'] ) ) { return; }
    if ( $_GET['page'] !== 'ljc-settings' || $_GET['ljc_export'] !== 'leads' ) { return; }
    if ( ! current_user_can( 'manage_options' ) ) { wp_die( 'Unauthorized' ); }
    check_admin_referer( 'ljc_export_leads' );

    global $wpdb;
    $table = $wpdb->prefix . 'ljc_leads';
    $leads = $wpdb->get_results( "SELECT * FROM {$table} ORDER BY created_at DESC", ARRAY_A );

    header( 'Content-Type: text/csv; charset=utf-8' );
    header( 'Content-Disposition: attachment; filename=ringguide-leads-' . date( 'Y-m-d' ) . '.csv' );
    header( 'Pragma: no-cache' );

    $out = fopen( 'php://output', 'w' );
    fprintf( $out, chr(0xEF).chr(0xBB).chr(0xBF) ); // UTF-8 BOM for Excel
    fputcsv( $out, [ 'ID', 'Datum', 'Namn', 'E-post', 'Bokad', 'Sökväg', 'Primär stil', 'Sekundär stil', 'Metall', 'Stenform', 'Infattning', 'Kramlor', 'Band', 'Känsla', 'Budget' ] );
    foreach ( $leads as $row ) {
        fputcsv( $out, [
            $row['id'], $row['created_at'], $row['name'] ?? '', $row['email'] ?? '',
            ! empty($row['booked']) ? 'Ja' : 'Nej',
            $row['path'], $row['style_primary'], $row['style_secondary'],
            $row['metal'], $row['shape'], $row['mounting'],
            $row['prong'], $row['band'], $row['feel'], $row['budget'],
        ] );
    }
    fclose( $out );
    exit;
}

// ── Admin menu — top-level page ────────────────────────────────────────────

add_action( 'admin_menu', 'ljc_admin_menu' );

function ljc_admin_menu() {
    // Diamond SVG icon
    $icon = 'data:image/svg+xml;base64,' . base64_encode(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' .
        '<path fill="#9ba8b5" d="M6.5 1.5h7l4 6-7.5 11-7.5-11 4-6zm.8 1l-3.1 4.7h11.6L12.7 2.5H7.3zm-3 5.5 6 8.8 6-8.8H4.3z"/>' .
        '</svg>'
    );

    add_menu_page(
        'Lilian\'s Ringguide',   // Page title
        'Ringguide',             // Menu label
        'manage_options',
        'ljc-settings',
        'ljc_settings_page',
        $icon,
        58                       // Position: just below Appearance
    );
}

// ── Admin settings page ────────────────────────────────────────────────────

function ljc_settings_page() {
    $tab = isset( $_GET['tab'] ) ? sanitize_key( $_GET['tab'] ) : 'general';

    // ── Save ──────────────────────────────────────────────────────────────
    if ( isset( $_POST['ljc_save'] ) && check_admin_referer( 'ljc_settings' ) ) {

        if ( $tab === 'general' ) {
            update_option( 'admin_email',        sanitize_email(      $_POST['ljc_email']          ?? get_option('admin_email') ) );
            update_option( 'ljc_amelia_url',     esc_url_raw(         $_POST['ljc_amelia']         ?? '/boka/' ) );
            update_option( 'ljc_bubble_enabled', isset( $_POST['ljc_bubble_enabled'] ) ? '1' : '0' );
            update_option( 'ljc_bubble_text',    sanitize_text_field( $_POST['ljc_bubble_text']    ?? '' ) );
            update_option( 'ljc_bubble_emoji',   sanitize_text_field( $_POST['ljc_bubble_emoji']   ?? '💍' ) );
        }

        if ( $tab === 'profiles' ) {
            foreach ( ljc_profile_defs() as $key => $pdef ) {
                foreach ( array_keys( $pdef['fields'] ) as $field ) {
                    update_option( 'ljc_prof_' . $key . '_' . $field, sanitize_text_field( $_POST[ 'ljc_prof_' . $key . '_' . $field ] ?? '' ) );
                }
            }
        }

        if ( $tab === 'rings' ) {
            foreach ( array_keys( ljc_profile_defs() ) as $key ) {
                for ( $n = 1; $n <= 3; $n++ ) {
                    update_option( 'ljc_ring_' . $key . '_' . $n . '_name',   sanitize_text_field( $_POST[ 'ljc_ring_' . $key . '_' . $n . '_name'   ] ?? '' ) );
                    update_option( 'ljc_ring_' . $key . '_' . $n . '_url',    esc_url_raw(         $_POST[ 'ljc_ring_' . $key . '_' . $n . '_url'    ] ?? '' ) );
                    update_option( 'ljc_ring_' . $key . '_' . $n . '_img',    (int)(               $_POST[ 'ljc_ring_' . $key . '_' . $n . '_img'    ] ?? 0  ) );
                    update_option( 'ljc_ring_' . $key . '_' . $n . '_imgurl', esc_url_raw(         $_POST[ 'ljc_ring_' . $key . '_' . $n . '_imgurl' ] ?? '' ) );
                }
            }
        }

        if ( $tab === 'welcome' ) {
            update_option( 'ljc_welcome_title', sanitize_text_field(     $_POST['ljc_welcome_title'] ?? '' ) );
            update_option( 'ljc_welcome_desc',  sanitize_textarea_field( $_POST['ljc_welcome_desc']  ?? '' ) );
        }

        if ( $tab === 'images' ) {
            foreach ( ljc_image_groups() as $group ) {
                foreach ( $group as $key => $label ) {
                    update_option( 'ljc_img_' . $key, (int)( $_POST['ljc_img_' . $key] ?? 0 ) );
                }
            }
        }

        if ( $tab === 'strings' ) {
            foreach ( ljc_question_defs() as $qdef ) {
                $qid = $qdef['qid'];
                update_option( 'ljc_str_' . $qid . '_title', sanitize_text_field( $_POST[ 'ljc_str_' . $qid . '_title' ] ?? '' ) );
                update_option( 'ljc_str_' . $qid . '_sub',   sanitize_text_field( $_POST[ 'ljc_str_' . $qid . '_sub'   ] ?? '' ) );
                foreach ( $qdef['opts'] as $opt ) {
                    $oid   = $opt[0];
                    $field = $opt[3];
                    update_option( 'ljc_str_' . $qid . '_' . $oid . '_label', sanitize_text_field( $_POST[ 'ljc_str_' . $qid . '_' . $oid . '_label' ] ?? '' ) );
                    update_option( 'ljc_str_' . $qid . '_' . $oid . '_' . $field, sanitize_text_field( $_POST[ 'ljc_str_' . $qid . '_' . $oid . '_' . $field ] ?? '' ) );
                }
            }
        }

        echo '<div class="notice notice-success is-dismissible"><p>&#10003; Inställningarna sparades.</p></div>';
    }

    $quiz_url = '';
    $quiz_page = get_page_by_path('smyckeskonsultation');
    if ( $quiz_page ) { $quiz_url = get_permalink( $quiz_page->ID ); }

    $tabs = [
        'general'  => 'Allmänt',
        'welcome'  => 'Välkomsttext',
        'images'   => 'Bilder',
        'strings'  => 'Frågor &amp; Text',
        'profiles' => 'Resultatprofiler',
        'rings'    => 'Ringar',
        'leads'    => 'Leads',
    ];
    ?>
    <div class="wrap ljc-wrap">

      <div class="ljc-header">
        <span class="ljc-header-icon">&#128141;</span>
        <div>
          <h1>Lilian's Ringguide</h1>
          <p>Version <?php echo LJC_VER; ?> &mdash;
            <?php if ( $quiz_url ) : ?>
              <a href="<?php echo esc_url($quiz_url); ?>" target="_blank">Förhandsgranska guiden &#8599;</a>
            <?php else : ?>
              <em>Aktivera pluginet för att skapa guidsidan automatiskt.</em>
            <?php endif; ?>
          </p>
        </div>
      </div>

      <nav class="nav-tab-wrapper ljc-tabs">
        <?php foreach ( $tabs as $slug => $label ) :
          $active = ( $tab === $slug ) ? ' nav-tab-active' : '';
          $url    = admin_url( 'admin.php?page=ljc-settings&tab=' . $slug );
        ?>
          <a href="<?php echo esc_url($url); ?>" class="nav-tab<?php echo $active; ?>"><?php echo esc_html($label); ?></a>
        <?php endforeach; ?>
      </nav>

      <form method="post" class="ljc-form">
        <?php wp_nonce_field('ljc_settings'); ?>

        <?php /* ──────────────── TAB: ALLMÄNT ─────────────────────────── */ ?>
        <?php if ( $tab === 'general' ) : ?>
          <div class="ljc-card-box">
            <h2>Bokningsinställningar</h2>
            <table class="form-table">
              <tr>
                <th><label for="ljc_email">E-post för bokningar</label></th>
                <td>
                  <input type="email" id="ljc_email" name="ljc_email"
                         value="<?php echo esc_attr( get_option('admin_email') ); ?>" class="regular-text">
                  <p class="description">Hit skickas kundens profildata när de bokar konsultation.</p>
                </td>
              </tr>
              <tr>
                <th><label for="ljc_amelia">Amelia-bokningssida (URL)</label></th>
                <td>
                  <input type="url" id="ljc_amelia" name="ljc_amelia"
                         value="<?php echo esc_attr( get_option('ljc_amelia_url', '/boka/') ); ?>"
                         class="large-text" placeholder="https://liliansjewelry.se/boka/">
                  <p class="description">Kunden skickas hit när de klickar "Boka konsultation" i resultatet.</p>
                </td>
              </tr>
            </table>
          </div>
          <div class="ljc-card-box">
            <h2>Information</h2>
            <table class="form-table">
              <tr>
                <th>Quizsida</th>
                <td>
                  <?php if ( $quiz_url ) : ?>
                    <a href="<?php echo esc_url($quiz_url); ?>" target="_blank"><?php echo esc_html($quiz_url); ?></a>
                  <?php else : ?>
                    <em>Sidan skapas automatiskt vid aktivering av pluginet.</em>
                  <?php endif; ?>
                </td>
              </tr>
              <tr>
                <th>Bildmapp (fallback)</th>
                <td><code><?php echo esc_html( LJC_DIR . 'images/' ); ?></code>
                  <p class="description">Bilder utan uppladdning i mediabiblioteket hämtas härifrån med emoji-placeholder som fallback.</p>
                </td>
              </tr>
            </table>
          </div>

          <div class="ljc-card-box">
            <h2>Pratbubblan &amp; Ringknappen</h2>
            <table class="form-table">
              <tr>
                <th><label for="ljc_bubble_enabled">Visa pratbubbla</label></th>
                <td>
                  <label>
                    <input type="checkbox" id="ljc_bubble_enabled" name="ljc_bubble_enabled" value="1"
                           <?php checked( get_option('ljc_bubble_enabled','1'), '1' ); ?>>
                    Visa pratbubblan på alla sidor (utom quizsidan)
                  </label>
                </td>
              </tr>
              <tr>
                <th><label for="ljc_bubble_text">Bubbeltexten</label></th>
                <td>
                  <input type="text" id="ljc_bubble_text" name="ljc_bubble_text"
                         value="<?php echo esc_attr( get_option('ljc_bubble_text','') ); ?>"
                         placeholder="Hitta din drömring med vår ringguide"
                         class="large-text">
                </td>
              </tr>
              <tr>
                <th><label for="ljc_bubble_emoji">Knapp-emoji / ikon</label></th>
                <td>
                  <input type="text" id="ljc_bubble_emoji" name="ljc_bubble_emoji"
                         value="<?php echo esc_attr( get_option('ljc_bubble_emoji','') ); ?>"
                         placeholder="💍"
                         style="width:80px;font-size:20px;text-align:center;">
                  <p class="description">En emoji eller ett tecken. Standard: 💍</p>
                </td>
              </tr>
            </table>
          </div>

        <?php /* ──────────────── TAB: VÄLKOMSTTEXT ──────────────────────── */ ?>
        <?php elseif ( $tab === 'welcome' ) : ?>
          <div class="ljc-card-box">
            <h2>Välkomstskärm</h2>
            <p class="description" style="margin-bottom:16px;">Texten som visas på startskärmen innan quizet börjar. Lämna tomt för att använda standardtexten.</p>
            <table class="form-table">
              <tr>
                <th><label for="ljc_welcome_title">Rubrik</label></th>
                <td>
                  <input type="text" id="ljc_welcome_title" name="ljc_welcome_title"
                         value="<?php echo esc_attr( get_option('ljc_welcome_title', '') ); ?>"
                         class="large-text"
                         placeholder="Hitta din perfekta ring">
                </td>
              </tr>
              <tr>
                <th><label for="ljc_welcome_desc">Beskrivning</label></th>
                <td>
                  <textarea id="ljc_welcome_desc" name="ljc_welcome_desc" rows="4" class="large-text"
                            placeholder="Du behöver inte kunna några smyckestermer — jag guidar dig steg för steg..."
                  ><?php echo esc_textarea( get_option('ljc_welcome_desc', '') ); ?></textarea>
                </td>
              </tr>
            </table>
          </div>

        <?php /* ──────────────── TAB: BILDER ──────────────────────────── */ ?>
        <?php elseif ( $tab === 'images' ) : ?>

          <div class="ljc-card-box">
            <div class="ljc-images-header">
              <div>
                <h2>Frågekort &ndash; bilder</h2>
                <p class="description">
                  Klicka på ett kort för att välja bild från mediabiblioteket.
                  Bilder sparas i 600&times;600 px (ljc-card-storlek) för skarp HD-kvalitet.
                  Laddar du upp befintliga bilder för första gången, kör
                  <strong>Regenerate Thumbnails</strong> för att skapa rätt storlek.
                </p>
              </div>
            </div>

            <?php foreach ( ljc_image_groups() as $group_name => $slots ) : ?>
              <div class="ljc-img-group">
                <h3 class="ljc-group-title"><?php echo esc_html( $group_name ); ?></h3>
                <div class="ljc-img-grid">
                  <?php foreach ( $slots as $key => $label ) :
                    $att_id  = (int) get_option( 'ljc_img_' . $key, 0 );
                    $thumb   = $att_id ? wp_get_attachment_image_url( $att_id, 'medium' ) : '';
                    $has_img = (bool) $thumb;
                  ?>
                  <div class="ljc-img-slot<?php echo $has_img ? ' has-img' : ''; ?>"
                       data-key="<?php echo esc_attr( $key ); ?>">
                    <div class="ljc-img-thumb" id="ljc-thumb-<?php echo esc_attr($key); ?>">
                      <?php if ( $has_img ) : ?>
                        <img src="<?php echo esc_url( $thumb ); ?>" alt="">
                      <?php else : ?>
                        <span class="ljc-img-placeholder">+</span>
                      <?php endif; ?>
                    </div>
                    <p class="ljc-img-name"><?php echo esc_html( $label ); ?></p>
                    <button type="button" class="ljc-img-remove" title="Ta bort bild"
                            data-key="<?php echo esc_attr($key); ?>">&#215;</button>
                    <input type="hidden"
                           name="ljc_img_<?php echo esc_attr($key); ?>"
                           id="ljc-img-<?php echo esc_attr($key); ?>"
                           value="<?php echo esc_attr($att_id); ?>">
                  </div>
                  <?php endforeach; ?>
                </div>
              </div>
            <?php endforeach; ?>

          </div><!-- .ljc-card-box -->

        <?php /* ──────────────── TAB: FRÅGOR & TEXT ──────────────────────── */ ?>
        <?php elseif ( $tab === 'strings' ) : ?>

          <div class="ljc-card-box">
            <h2>Frågor &amp; Kortext</h2>
            <p class="description" style="margin-bottom:16px;">
              Skriv över valfri frågerubrik, undertext eller korts etikett. Lämna fält tomma för att använda standardtexten.
              <strong>Obs:</strong> Ändringar påverkar inte quiz-logiken eller poängsättningen.
            </p>
          </div>

          <?php foreach ( ljc_question_defs() as $qdef ) :
            $qid = $qdef['qid'];
            $cur_title = get_option( 'ljc_str_' . $qid . '_title', '' );
            $cur_sub   = get_option( 'ljc_str_' . $qid . '_sub',   '' );
          ?>
          <details class="ljc-card-box ljc-q-details">
            <summary class="ljc-q-summary">
              <strong><?php echo esc_html( $qdef['name'] ); ?></strong>
              <?php if ( $cur_title !== '' ) : ?><span class="ljc-q-badge">Ändrad</span><?php endif; ?>
            </summary>

            <table class="form-table" style="margin-top:12px;">
              <tr>
                <th><label>Rubrik</label></th>
                <td>
                  <input type="text" name="ljc_str_<?php echo esc_attr($qid); ?>_title"
                         value="<?php echo esc_attr( $cur_title ); ?>"
                         placeholder="<?php echo esc_attr( $qdef['title'] ); ?>"
                         class="large-text">
                </td>
              </tr>
              <tr>
                <th><label>Undertext</label></th>
                <td>
                  <input type="text" name="ljc_str_<?php echo esc_attr($qid); ?>_sub"
                         value="<?php echo esc_attr( $cur_sub ); ?>"
                         placeholder="<?php echo esc_attr( $qdef['sub'] ); ?>"
                         class="large-text">
                </td>
              </tr>
            </table>

            <?php if ( ! empty( $qdef['opts'] ) ) : ?>
            <h3 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#50575e;margin:16px 0 8px;">Alternativ</h3>
            <table class="widefat striped ljc-opts-table">
              <thead><tr>
                <th style="width:160px">Alternativ</th>
                <th>Etikett</th>
                <th><?php echo $qdef['opts'][0][3] === 'tip' ? 'Tooltip' : 'Undertext'; ?></th>
              </tr></thead>
              <tbody>
              <?php foreach ( $qdef['opts'] as $opt ) :
                $oid        = $opt[0];
                $opt_name   = $opt[1];
                $opt_sub_ph = $opt[2];
                $sub_field  = $opt[3];
                $cur_label  = get_option( 'ljc_str_' . $qid . '_' . $oid . '_label', '' );
                $cur_sf     = get_option( 'ljc_str_' . $qid . '_' . $oid . '_' . $sub_field, '' );
              ?>
              <tr>
                <td style="color:#50575e;font-size:12px;"><?php echo esc_html( $opt_name ); ?></td>
                <td>
                  <input type="text"
                         name="ljc_str_<?php echo esc_attr($qid); ?>_<?php echo esc_attr($oid); ?>_label"
                         value="<?php echo esc_attr( $cur_label ); ?>"
                         placeholder="<?php echo esc_attr( $opt_name ); ?>"
                         class="regular-text">
                </td>
                <td>
                  <?php if ( $opt_sub_ph !== '' || $cur_sf !== '' ) : ?>
                  <input type="text"
                         name="ljc_str_<?php echo esc_attr($qid); ?>_<?php echo esc_attr($oid); ?>_<?php echo esc_attr($sub_field); ?>"
                         value="<?php echo esc_attr( $cur_sf ); ?>"
                         placeholder="<?php echo esc_attr( $opt_sub_ph ); ?>"
                         class="regular-text">
                  <?php else : ?>
                  <span style="color:#c3c4c7;font-size:11px;">—</span>
                  <input type="hidden"
                         name="ljc_str_<?php echo esc_attr($qid); ?>_<?php echo esc_attr($oid); ?>_<?php echo esc_attr($sub_field); ?>"
                         value="">
                  <?php endif; ?>
                </td>
              </tr>
              <?php endforeach; ?>
              </tbody>
            </table>
            <?php endif; ?>
          </details>
          <?php endforeach; ?>

        <?php /* ──────────────── TAB: RESULTATPROFILER ──────────────────── */ ?>
        <?php elseif ( $tab === 'profiles' ) : ?>

          <div class="ljc-card-box">
            <h2>Resultatprofiler</h2>
            <p class="description" style="margin-bottom:16px;">
              Skriv över texterna som visas i slutet av quizet för varje stilprofil.
              Lämna fält tomma för att använda standardtexten.
            </p>
          </div>

          <?php
          $prof_field_labels = [
            'name'     => 'Profilnamn',
            'quote'    => 'Citat (visas i blockquote)',
            'stone'    => 'Sten',
            'mounting' => 'Infattning',
            'prongs'   => 'Kramlor',
            'band'     => 'Band',
            'metal'    => 'Metall',
            'carat'    => 'Karat / storlek',
          ];
          foreach ( ljc_profile_defs() as $key => $pdef ) :
            $has_override = false;
            foreach ( array_keys($pdef['fields']) as $f ) {
                if ( get_option('ljc_prof_'.$key.'_'.$f,'') !== '' ) { $has_override = true; break; }
            }
          ?>
          <details class="ljc-card-box ljc-q-details">
            <summary class="ljc-q-summary">
              <strong><?php echo esc_html( $pdef['label'] ); ?></strong>
              <?php if ($has_override) : ?><span class="ljc-q-badge">Ändrad</span><?php endif; ?>
            </summary>
            <table class="form-table" style="margin-top:12px;">
              <?php foreach ( $pdef['fields'] as $field => $default ) :
                $val = get_option( 'ljc_prof_' . $key . '_' . $field, '' );
                $fl  = $prof_field_labels[$field] ?? $field;
              ?>
              <tr>
                <th><label><?php echo esc_html($fl); ?></label></th>
                <td>
                  <input type="text"
                         name="ljc_prof_<?php echo esc_attr($key); ?>_<?php echo esc_attr($field); ?>"
                         value="<?php echo esc_attr($val); ?>"
                         placeholder="<?php echo esc_attr($default); ?>"
                         class="large-text">
                </td>
              </tr>
              <?php endforeach; ?>
            </table>
          </details>
          <?php endforeach; ?>

        <?php /* ──────────────── TAB: RINGAR ──────────────────────────── */ ?>
        <?php elseif ( $tab === 'rings' ) : ?>

          <div class="ljc-card-box">
            <h2>Rekommenderade ringar per profil</h2>
            <p class="description" style="margin-bottom:16px;">
              Lägg till upp till 3 ringar per stilprofil. De visas i resultatet direkt under bokningsknappen.
              Välj bild från mediabiblioteket eller klistra in en bild-URL.
            </p>
          </div>

          <?php foreach ( ljc_profile_defs() as $key => $pdef ) :
            $has_rings = false;
            for ( $n = 1; $n <= 3; $n++ ) {
                if ( get_option('ljc_ring_'.$key.'_'.$n.'_name','') || get_option('ljc_ring_'.$key.'_'.$n.'_url','') ) { $has_rings = true; break; }
            }
          ?>
          <details class="ljc-card-box ljc-q-details" <?php echo $has_rings ? 'open' : ''; ?>>
            <summary class="ljc-q-summary">
              <strong><?php echo esc_html( $pdef['label'] ); ?></strong>
              <?php if ($has_rings) : ?><span class="ljc-q-badge">Ringar tillagda</span><?php endif; ?>
            </summary>
            <div class="ljc-rings-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:16px 20px;">
              <?php for ( $n = 1; $n <= 3; $n++ ) :
                $r_name   = get_option( 'ljc_ring_' . $key . '_' . $n . '_name',   '' );
                $r_url    = get_option( 'ljc_ring_' . $key . '_' . $n . '_url',    '' );
                $r_img_id = (int) get_option( 'ljc_ring_' . $key . '_' . $n . '_img', 0 );
                $r_imgurl = get_option( 'ljc_ring_' . $key . '_' . $n . '_imgurl', '' );
                $r_thumb  = $r_img_id ? wp_get_attachment_image_url( $r_img_id, 'medium' ) : $r_imgurl;
                $pfx      = 'ljc_ring_' . $key . '_' . $n;
              ?>
              <div class="ljc-ring-slot">
                <p class="ljc-group-title" style="margin-bottom:8px;">Ring <?php echo $n; ?></p>

                <div class="ljc-ring-img-picker ljc-img-slot<?php echo $r_thumb ? ' has-img' : ''; ?>"
                     data-ring-key="<?php echo esc_attr($key.'_'.$n); ?>" style="margin-bottom:8px;width:100%;">
                  <div class="ljc-img-thumb" id="ljc-rthumb-<?php echo esc_attr($key.'_'.$n); ?>" style="width:100%;height:120px;">
                    <?php if ($r_thumb) : ?>
                      <img src="<?php echo esc_url($r_thumb); ?>" alt="">
                    <?php else : ?>
                      <span class="ljc-img-placeholder">+</span>
                    <?php endif; ?>
                  </div>
                  <button type="button" class="ljc-img-remove ljc-ring-remove" title="Ta bort bild"
                          data-ring-key="<?php echo esc_attr($key.'_'.$n); ?>">&#215;</button>
                </div>

                <input type="text" name="<?php echo esc_attr($pfx); ?>_imgurl"
                       id="ljc-rimgurl-<?php echo esc_attr($key.'_'.$n); ?>"
                       value="<?php echo esc_attr($r_imgurl); ?>"
                       placeholder="Bild-URL (eller välj ovan)"
                       class="widefat" style="margin-bottom:6px;font-size:11px;">
                <input type="hidden" name="<?php echo esc_attr($pfx); ?>_img"
                       id="ljc-rimg-<?php echo esc_attr($key.'_'.$n); ?>"
                       value="<?php echo esc_attr($r_img_id); ?>">

                <input type="text" name="<?php echo esc_attr($pfx); ?>_name"
                       value="<?php echo esc_attr($r_name); ?>"
                       placeholder="Ringnamn"
                       class="widefat" style="margin-bottom:6px;">
                <input type="url"  name="<?php echo esc_attr($pfx); ?>_url"
                       value="<?php echo esc_attr($r_url); ?>"
                       placeholder="https://…"
                       class="widefat">
              </div>
              <?php endfor; ?>
            </div>
          </details>
          <?php endforeach; ?>

        <?php /* ──────────────── TAB: LEADS ──────────────────────────── */ ?>
        <?php elseif ( $tab === 'leads' ) : ?>
          <?php
          global $wpdb;
          $table  = $wpdb->prefix . 'ljc_leads';
          $leads  = $wpdb->get_results( "SELECT * FROM {$table} ORDER BY created_at DESC LIMIT 200", ARRAY_A );
          $total  = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$table}" );
          $export_url = wp_nonce_url( admin_url( 'admin.php?page=ljc-settings&tab=leads&ljc_export=leads' ), 'ljc_export_leads' );
          ?>
          <div class="ljc-card-box">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
              <div>
                <h2 style="border:none;padding:0;margin:0 0 4px;">Leads <span style="font-weight:400;color:#646970;">(<?php echo $total; ?> totalt)</span></h2>
                <p class="description">Sparas automatiskt varje gång en besökare fullföljer quizet.</p>
              </div>
              <a href="<?php echo esc_url($export_url); ?>" class="button button-secondary">&#8595; Exportera CSV</a>
            </div>
          </div>

          <?php if ( empty($leads) ) : ?>
          <div class="ljc-card-box">
            <p style="color:#646970;text-align:center;padding:20px 0;">Inga leads ännu — de dyker upp här när besökare fullföljer quizet.</p>
          </div>
          <?php else : ?>
          <div class="ljc-card-box" style="padding:0;overflow:hidden;">
            <table class="widefat striped" style="border:none;">
              <thead><tr>
                <th>Datum</th>
                <th>Namn</th>
                <th>E-post</th>
                <th>Bokad</th>
                <th>Väg</th>
                <th>Stil</th>
                <th>Metall</th>
                <th>Stenform</th>
                <th>Budget</th>
              </tr></thead>
              <tbody>
              <?php foreach ( $leads as $row ) :
                $booked = ! empty($row['booked']);
              ?>
              <tr>
                <td style="white-space:nowrap;color:#646970;font-size:12px;"><?php echo esc_html( $row['created_at'] ); ?></td>
                <td><strong><?php echo $row['name'] ? esc_html($row['name']) : '<span style="color:#c3c4c7">—</span>'; ?></strong></td>
                <td><?php echo $row['email'] ? '<a href="mailto:' . esc_attr($row['email']) . '">' . esc_html($row['email']) . '</a>' : '<span style="color:#c3c4c7">—</span>'; ?></td>
                <td><?php echo $booked ? '<span style="color:#0a7b3d;font-weight:600;">✓ Ja</span>' : '<span style="color:#c3c4c7">Nej</span>'; ?></td>
                <td><?php echo esc_html( $row['path'] ); ?></td>
                <td><?php echo esc_html( $row['style_primary'] . ($row['style_secondary'] ? ' / '.$row['style_secondary'] : '') ); ?></td>
                <td><?php echo esc_html( $row['metal'] ); ?></td>
                <td><?php echo esc_html( $row['shape'] ); ?></td>
                <td><?php echo esc_html( $row['budget'] ); ?></td>
              </tr>
              <?php endforeach; ?>
              </tbody>
            </table>
            <?php if ($total > 200) : ?>
            <p class="description" style="padding:8px 16px;">Visar de senaste 200 av <?php echo $total; ?> leads. Exportera CSV för hela listan.</p>
            <?php endif; ?>
          </div>
          <?php endif; ?>

        <?php endif; ?>

        <?php if ( $tab !== 'leads' ) : ?>
          <?php submit_button( 'Spara inställningar', 'primary large', 'ljc_save' ); ?>
        <?php endif; ?>
      </form>
    </div><!-- .wrap -->

    <?php if ( $tab === 'images' ) : ?>
    <script>
    jQuery(function($) {
      $(document).on('click', '.ljc-img-slot', function(e) {
        if ( $(e.target).hasClass('ljc-img-remove') ) { return; }
        var key = $(this).data('key');
        var $slot = $(this);
        var frame = wp.media({ title: 'Välj bild', button: { text: 'Välj bild' }, multiple: false });
        frame.on('select', function() {
          var att   = frame.state().get('selection').first().toJSON();
          var thumb = (att.sizes && att.sizes.medium) ? att.sizes.medium.url : att.url;
          $slot.addClass('has-img');
          $('#ljc-thumb-' + key).html('<img src="' + thumb + '" alt="">');
          $('#ljc-img-' + key).val(att.id);
        });
        frame.open();
      });
      $(document).on('click', '.ljc-img-remove', function(e) {
        e.stopPropagation();
        var key = $(this).data('key');
        $(this).closest('.ljc-img-slot').removeClass('has-img');
        $('#ljc-thumb-' + key).html('<span class="ljc-img-placeholder">+</span>');
        $('#ljc-img-' + key).val('');
      });
    });
    </script>
    <?php endif; ?>

    <?php if ( $tab === 'rings' ) : ?>
    <script>
    jQuery(function($) {
      // Click on ring image area → open media picker
      $(document).on('click', '.ljc-ring-img-picker', function(e) {
        if ( $(e.target).hasClass('ljc-ring-remove') ) { return; }
        var rkey  = $(this).data('ring-key');
        var $slot = $(this);
        var frame = wp.media({ title: 'Välj ringbild', button: { text: 'Välj bild' }, multiple: false });
        frame.on('select', function() {
          var att   = frame.state().get('selection').first().toJSON();
          var thumb = (att.sizes && att.sizes.medium) ? att.sizes.medium.url : att.url;
          $slot.addClass('has-img');
          $('#ljc-rthumb-' + rkey).html('<img src="' + thumb + '" alt="">');
          $('#ljc-rimg-'   + rkey).val(att.id);
          $('#ljc-rimgurl-'+ rkey).val(''); // clear manual URL when media library is used
        });
        frame.open();
      });
      $(document).on('click', '.ljc-ring-remove', function(e) {
        e.stopPropagation();
        var rkey = $(this).data('ring-key');
        $(this).closest('.ljc-ring-img-picker').removeClass('has-img');
        $('#ljc-rthumb-' + rkey).html('<span class="ljc-img-placeholder">+</span>');
        $('#ljc-rimg-'   + rkey).val('');
      });
    });
    </script>
    <?php endif; ?>
    <?php
}
