import React from 'react';


const Rank=({name,entries})=>{
	//console.log(name);
	return(
		<div >
		<div className='white f3'>
			
		{name}
		</div>
			<div className='white f3'>
				your entry count is....'
			</div>
			<div className='white f4'>
				{entries}
			</div>
		</div>
		);
}
export default Rank