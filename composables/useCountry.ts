// Unknowed languages
// USes - Espagnol (?)
// EUnl - Néerlandais || Allemand (?)
// TWzh - Chinois || Tailandais (?)

// import Cookies from 'js-cookie'
// import { useAsyncState } from '@vueuse/core'


export default function () {
    const state = reactive({
        countries: [
            {code: 'USen', label: 'United State', flag: 'us'},
            {code: 'EUen', label: 'English', flag: 'gb'},
            {code: 'EUde', label: 'Deutsch', flag: 'de'},
            {code: 'EUes', label: 'Español', flag: 'es'},
            {code: 'EUfr', label: 'Français', flag: 'fr'},
            {code: 'USfr', label: 'Canadien', flag: 'ca'},
            {code: 'EUit', label: 'Italiano', flag: 'it'},
            {code: 'CNzh', label: '中国人', flag: 'cn'},
            {code: 'JPja', label: '日本', flag: 'jp'},
            {code: 'KRko', label: '한국인', flag: 'kr'},
            {code: 'EUru', label: 'Русский', flag: 'ru'},
        ]
    })
    // const {selectedContry, ready } = 
    // console.log(new Promise(async () => await Cookies.get('country/selected') || state.countries[0]))
    // const setSelectedCountry = async (country) => await Cookies.set('country/selected', country)
    return {
        ...toRefs(state),
        selectedContry: () => state.countries[0],
        setSelectedCountry: () => {}
    }
}