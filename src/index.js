import React from "react";
import ReactDOM from 'react-dom'
import axios from 'axios'
import Table from "./components/Table";
import CurrentUser from "./components/CurrentUser";
import Spinner from "./components/spinner";
import Modal from "./components/Modal";
import Portal from "./components/Portal";
import Pagination from "./components/Pagination";
import './components/index.css'
import SearchPanel from "./components/SearchPanel";
import CountPanel from "./components/CountPanel";

const minURL = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
const maxURL = 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'

const headConfig = ['id', 'firstName', 'lastName', 'email', 'phone']

class Root extends React.Component{
    state = {
        currentURL: minURL,
        data: [],
        currentUser: {},
        isLoaded: false,
        showModal: false,
        reversDirection: false,
        sortField: '',
        currentPage: 1,
        perPage: 50,
        term: ''
    }


    componentDidMount() {
        // После загружаем данные
       this.getData(this.state.currentURL)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // Обновляем данные когда переключили источник данных
        if(prevState.currentURL !== this.state.currentURL) {
            this.getData(this.state.currentURL)
        }
    }


    getData = async (url) => {
        // Включаем спиннер при загрузке данных
        this.setState({
            isLoaded: false,
        })

        // Выкидываем ошибку если что то пойдет не так
        try {
            const responce = await axios.get(url)
            this.setState({
                data: responce.data,
                isLoaded: true,
            })

        } catch (e) {
            alert('Ошибка загрузки данных')
        }
    }

    setCurrentUser = (data) => {
        // Обновляем стэйт при клике на юзера
        this.setState({currentUser: data})
    }

    hidePopup = () => {
        this.setState({showModal: false})
    }

    addData = (newData) => this.setState((state) => {
        // Добавляем данные в начало таблицы
        return { data: [ newData, ...state.data]}
    })

    sortData = (sortField) => {
        // Делаем сортировку по выбранному полю, в зависимости от направления. Работать с данными стэйта нельзя, по этому делаем копию.
        let tempData = this.state.data
        if (!this.state.reversDirection) {
            tempData = tempData.sort((a, b) => a[sortField] > b[sortField] ? 1 : -1)

            this.setState({
                data: tempData,
                reversDirection: true,
                sortField: sortField
            })
        } else {
            tempData = tempData.sort((a, b) => a[sortField] < b[sortField] ? 1 : -1)

            this.setState({
                data: tempData,
                reversDirection: false,
                sortField: sortField
            })
        }
    }

    onPageChange = (currentPage) => {
        this.setState({
            currentPage
        })
    }

    pageData = () => {
        // Выводим данные постранично, отфльтрованные поиском
        const temp = this.search(this.state.data, this.state.term)
        return temp.slice((this.state.currentPage - 1) * this.state.perPage, (this.state.currentPage) * this.state.perPage)
    }

    search = (items, term) => {
        // Поиск по всем полям на вхождение подстроки
        if (term.length === 0 ) return items
        return items.filter( item => {
            return  item.id.toString().indexOf(term) > -1 ||
                    item.firstName.indexOf(term) > -1 ||
                    item.lastName.indexOf(term) > -1 ||
                    item.email.indexOf(term) > -1 ||
                    item.phone.indexOf(term) > -1
        })
    }

    onSearch = (term) => {
        this.setState({term})
    }

    changeULR = () => {
        this.state.currentURL === minURL ? this.setState({currentURL: maxURL}) : this.setState({currentURL: minURL})
    }

    render() {

        const visibleItems = this.pageData()

        return(
            <div className='ui container' style={{marginTop: '40px'}}>
                <button className="ui primary button"
                onClick={() => this.setState({showModal: true})}>
                    Добавить данные
                </button>

                <SearchPanel onSearch={this.onSearch} />

                <CountPanel isMin={this.state.currentURL === minURL} changeULR={this.changeULR}/>

                {/*Выводим спиннер пока данные не загрузились*/}

                {
                    this.state.isLoaded
                        ?
                        <Table
                            data={visibleItems}
                            headConfig={headConfig}
                            setCurrentUser={this.setCurrentUser}
                            currentUser={this.state.currentUser}
                            onSort={this.sortData}
                            sortField={this.state.sortField}
                            reversDirection={this.state.reversDirection}
                        />
                        :
                        <Spinner/>
                }


                <CurrentUser currentUser={this.state.currentUser} />

                <Portal>
                    <Modal showModal={this.state.showModal} hidePopup={this.hidePopup} addData={this.addData}/>
                </Portal>

                <Pagination
                    onPageChange={this.onPageChange}
                    dataCount={this.search(this.state.data, this.state.term).length}
                    currentPage={this.state.currentPage}
                    perPage={this.state.perPage}/>

            </div>
        )
    }
}

ReactDOM.render(<Root/>, document.querySelector('#root'))