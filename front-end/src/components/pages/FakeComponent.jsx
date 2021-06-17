import React from 'react';
import Moment from 'react-moment'
import 'moment-timezone';

Moment.globalLocale = 'fr';

const Timing = () => {
    const momentNow = Moment();
    const month =  momentNow.format('MMMM')
    return ( 
        <div>
            <Moment >{month}</Moment>
        </div>
     );
}
 
export default Timing;