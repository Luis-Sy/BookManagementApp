const Input = ({label, name, value, onChange, type}) => {
	return (
		<div>
            <label>{label}:<input type={type} name={name} value={value} onChange={onChange}/></label>
        </div>
	);
}

export default Input;