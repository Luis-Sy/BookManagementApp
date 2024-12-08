import {forwardRef} from 'react';
import {createPortal} from 'react-dom';

// forward ref is used to pass on useRef to a component from a parent

const DialogModal = forwardRef(function DialogModal(props, ref){
	
	const targetContainer = document.getElementById('dialogDisplay');

  if (!targetContainer) {
    console.error('Dialog target container not found.');
    return null; // Early return if target is not found
  }

  //console.log('Rendering ResultModal to:', targetContainer); // Debugging log

	
	return createPortal(
		<dialog ref={ref}>
			<h2>{props.header}</h2>
			<p>{props.body}</p>
			<form method="dialog">
				<button>Close</button>
			</form>
		</dialog>, targetContainer
		)
})

export default DialogModal;