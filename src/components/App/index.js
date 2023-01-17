import { Component } from 'react';
import Header from '../Header';
import Filter from '../Filter';
import List from '../List';
import Adder from '../Adder';
import './index.css';

export default class App extends Component {
    id_counter = 0;

    createListItem = (text) => {
        return {
            text,
            id: this.id_counter++,
            isDone: false,
            isImportant: false
        }
    }

    state = {
        listData: [
            this.createListItem('Click'),
            this.createListItem('on'),
            this.createListItem('me!')
        ],
        searchValue: '',
        filterValue: 'all' // can be 'all', 'isDone', 'isImportant'
    }

    deleteListItem = (id) => {
        this.setState(( { listData } ) => {
            const idToDeleteItem = listData.findIndex((el) => el.id === id);
            
            const newListData = [
                ...listData.slice(0, idToDeleteItem), 
                ...listData.slice(idToDeleteItem + 1)
            ];
            
            return {
                listData: newListData
            }
        });
    }

    addListItem = (text) => {
        this.setState(( { listData } ) => {
            const newListData = [
                ...listData, 
                this.createListItem(text)
            ]

            return {
                listData: newListData
            }
        })
    }

    findListItemById = (listData, id) => {
        return listData.find((listItem) => listItem.id === id);
    }

    togglePropertyOfListItem = (listData, id, property) => {
        const listItem = this.findListItemById(listData, id);
        const changedNewItem = { ...listItem, [property]: !listItem[property] }
        
        const newListData = [
            ...listData.slice(0, listData.indexOf(listItem)), 
            changedNewItem,
            ...listData.slice(listData.indexOf(listItem) + 1)
        ];

        return {
            listData: newListData
        }
    }

    setListItemIsDone = (id) => {
        this.setState(( { listData } ) => this.togglePropertyOfListItem(listData, id, 'isDone'));
    }

    setListItemIsImportant = (id) => {
        this.setState(( { listData } ) => this.togglePropertyOfListItem(listData, id, 'isImportant'));
    }

    setSearchValue = (searchValue) => {
        this.setState({ searchValue });
    }

    filterListBySearchValue = (list, value) => {
        return list.filter(( { text } ) => {
            return text.toLowerCase().includes(value.toLowerCase())
        })
    }

    setFilterValue = (filterValue) => {
        this.setState({ filterValue });
    }

    filterListByFilterValue = (list, value) => {
        if (value === 'isDone') {
            return list.filter((item) => !item[value]);
        }
        if (value === 'isImportant') {
            return list.filter((item) => item[value]);
        }
        return list;
    }

    render() {
        const { listData, searchValue, filterValue } = this.state;

        const doneCounter = listData.filter((item) => item.isDone).length;
        const leftToDoCounter = listData.length - doneCounter;

        let visibleListItems = this.filterListBySearchValue(listData, searchValue);
        visibleListItems = this.filterListByFilterValue(visibleListItems, filterValue);

        return (
            <div className="wrap">
                <Header doneCount={ doneCounter } leftToDoCount={ leftToDoCounter } />
                <Filter 
                    filterValue= { filterValue }
                    onSearched={ this.setSearchValue }
                    onButtonClicked= { (value) => this.setFilterValue(value) }
                />
                <List 
                    listItems={ visibleListItems } 
                    onDeleted={ this.deleteListItem }
                    onSetedIsDone={ this.setListItemIsDone }
                    onSetedIsImportant={ this.setListItemIsImportant }
                />
                <Adder onItemAdded={ this.addListItem }/>
            </div>
        )
    }
}
