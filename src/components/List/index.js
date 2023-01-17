import ListItem from "../ListItem";

const List = ({ listItems, onDeleted, onSetedIsDone, onSetedIsImportant }) => {

    const listItemsEls = listItems.map((item) => {
        const { id, ...itemData } = item;

        return (
            <li className="list-group-item" key={id}>
                <ListItem { ...itemData} 
                  onDeleted={ () => onDeleted(id) }
                  onSetedIsDone={ () => onSetedIsDone(id) }
                  onSetedIsImportant={ () => onSetedIsImportant(id) }
                />
            </li>
        )
    });

    return (
      <ul className="list-group">
        { listItemsEls }
      </ul>
    );
};

export default List;