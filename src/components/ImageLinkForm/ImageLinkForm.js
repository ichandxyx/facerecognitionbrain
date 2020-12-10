import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm=()=>{
	return(
		<div >
			<p className='f3'>
				{'This magic brain will detect faces in your pictures.'}
			</p>
			<div className='center'>
			<div className='form center pa4 br4 shadow-2'>
				<input className='f4 ba b--gold br3 pa2 w-70 center' type='tex'/>
				<button className='w-30 ba b--blue br3 grow f4 link ph3 pv2 dib white bg-blue'>Detect</button>
			</div>
			</div>
		</div>
		);
}
export default ImageLinkForm;