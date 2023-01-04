import PropTypes from 'prop-types';

export function Contacts({ data, deleteContact }) {
  return (
    <ul>
      {data.map(contact => (
        <li key={contact.id}>
          <span>{contact.name}</span>
          <span> {contact.number}</span>
          <button type="button" onClick={() => deleteContact(contact.id)}>
            Удалить контакт
          </button>
        </li>
      ))}
    </ul>
  );
}

Contacts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
