import React from 'react'

class DropZone extends React.Component {

    constructor() {
        super()
        this.state = {
            name: ''
        }
        this.displayName = this.displayName.bind(this)
    }

    dragOverHandler = (e) => {
        e.preventDefault()
    }

    handleDrop = (e) => {
        var { name } = e.dataTransfer.items[0].getAsFile()
        this.setState({ ...this.state, name })
        console.log(this.state)
    }


    displayName = () => {
        var { name } = this.state
        if (name !== '') {
            return (
                <h1> Your file {name} has been uploaded !</h1>
            )
        }
        else { return (<h1> Upload the document you want ! </h1>) }

    }


    render() {
        return (
            <div>
                <div
                    className="dropping-zone"
                    onDragOver={(e) => { this.dragOverHandler(e) }}
                    onDrop={(e) => { this.handleDrop(e) }}
                >
                    <h1>Hello DropZone</h1>
                    {this.displayName()}
                    <form action="">
                        <input type="file" />
                    </form>
                </div>
            </div>
        )
    }
}

export default DropZone