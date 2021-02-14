import axios from 'axios';
function read(file)
{
    axios.get('http://www.modminers.hu/skins/all_skins/01.png', {}).then(function(response){
        return response.data
    });
    /*rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);*/
}

export default { read }