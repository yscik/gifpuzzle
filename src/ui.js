function Ui()
{
    this.game = null;
}


Ui.prototype.setup = function setupUi()
{
    this.element = document.getElementById('ui');

    this.element.addEventListener('click', this.dispatchClick.bind(this));
};

Ui.prototype.dispatchClick = function dispatchClick(e)
{
    this[e.target.getAttribute('ui-click')].call(this);
};

Ui.prototype.start = function startGame()
{
    this.game = Game.create();
};

Ui.init = function init()
{
    new Ui();
};


export default Ui;