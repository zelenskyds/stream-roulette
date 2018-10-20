import axios from 'axios';
import actions from '../../store/actions';

export default function (store) {
    axios.get(
        'https://api.github.com/repos/zelenskyds/stream-roulette/releases/latest',
        {
            headers: {
                'accept': 'application/json'
            }
        }
    )
        .then(
            ({ data }) => {
                if(data.tag_name <= store.getState().system.version) {
                    return
                }

                const asset = data.assets.find( asset => asset.name === `partial-update-to-${data.tag_name.slice(1)}.zip` );

                if(!asset) {
                    return
                }

                store.dispatch(
                    actions.updateSystem({
                        next: data.tag_name,
                        nextUrl: asset.browser_download_url,
                        needUpdate: true
                    })
                )
            }
        );

}