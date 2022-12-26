AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" },
  },
  init: function () {
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
    this.handleClickEvents();
  },
  handleClickEvents: function () {

    this.el.addEventListener('click', (evt) => {
      const placesContainer = document.querySelector('#places-container')
      const { state } = placesContainer.getAttribute('tour')
      if (state == 'places-list') {
        const id = this.el.getAttribute('id')
        const places_id = ['taj-mahal', 'budapest', 'eiffel-tower', 'new-york-city']
        if (places_id.includes(id)) {
          placesContainer.setAttribute('tour', { state: 'view', selectedCard: id })
        }
      }
      if (state === 'view' || state === 'change-view') {
        this.handleViewState();
      }
    })
  },
  handlePlacesListState: function () {
    const id = this.el.getAttribute("id");
    const placesId = ["taj-mahal", "budapest", "new-york-city", "eiffel-tower"];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id,
      });
      this.el.setAttribute("material", {
        color: "#D76B30",
        opacity: 1,
      });
    }
  },
  mouseLeaveEvents: function () {

  },
  handleMouseEnterEvents: function () {
    // Mouse Enter Events
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesListState();
    });
  },
  handleMouseLeaveEvents: function () {
    // Mouse Leave Events
    this.el.addEventListener('mouseleave', () => {
      console.log('Working !!!')
      const { selectedItemId } = this.data;
      if (selectedItemId) {
        const el = document.querySelector(`#${selectedItemId}`)
        const id = el.getAttribute('id')
        console.log(id)
        if (id == selectedItemId) {
          el.setAttribute('material', { color: '#0077CC', opacity: 1 })
        }
      }
    })
  },
  handleViewState: function () {
    const el = this.el
    const id = el.getAttribute('id')
    const placeContainer = document.querySelector('#places-container')
    const { selectedItemId } = placeContainer.getAttribute("cursor-listener")
    const sideViewPlacesId = ['place-1', 'place-2', 'place-3', 'place-4']

    if (sideViewPlacesId.includes(id)) {
      placeContainer.setAttribute('tour', { state: 'change-view' })
      const skyEl = document.querySelector('#main-container')
      skyEl.setAttribute('material', {
        src: `assets/360_images/${selectedItemId}/${id}.jpg`,
        color: 'white'
      })
    }
  }
});
