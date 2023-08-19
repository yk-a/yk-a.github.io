
fetch('dipbib.txt')
  .then(response => response.text())
  .then(text => bibliographyTable(text))
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });



function bibliographyTable(text) {

  let lines = text.split(/[\n\r]/)

  let headHtml = ''
  let bodyHtml = ''

  for (var i = 0; i < 1; i++) {
    let data = lines[i].split(/\t/)
    headHtml += '<tr>'
    for (var j = 0; j < data.length - 1; j++) {
      headHtml += '<th>' + data[j] + '</th>'
    }
    headHtml += '</tr>'
  }

  for (var i = 1; i < lines.length; i++) {
    let data = lines[i].split(/\t/)
    let url = data[data.length - 1]
    bodyHtml += '<tr>'
    for (var j = 0; j < data.length - 1; j++) {
      //if (j == 1) {
        bodyHtml += `<td><a href="${ url }"> ${ data[j] }</a></td>`
      // } else {
      //   bodyHtml += `<td>${ data[j] }</td>`
      // }

    }
    bodyHtml += '</tr>'
  }


  let thead = document.querySelector('#table-bibliography thead')
  let tbody = document.querySelector('#table-bibliography tbody')

  thead.innerHTML = headHtml
  tbody.innerHTML = bodyHtml




  // sort table js
  let headers = [...document.querySelectorAll('#table-bibliography thead th')]

  headers.forEach(header => {
    console.log(header)

    header.onclick = e => {

      console.log(e)

      if (header.getAttribute('sort') === 'down') header.setAttribute('sort', 'up')
      else header.setAttribute('sort', 'down')

      headers.forEach(h => {
        if (h !== header) h.removeAttribute('sort')
      })


      let rows = [...document.querySelectorAll('#table-bibliography tbody tr')]
      let direction = header.getAttribute('sort') === 'down' ? 1 : -1;

      rows.sort((a,b) => {
        if(a.children[header.cellIndex].innerText < b.children[header.cellIndex].innerText) { return -direction; }
        if(a.children[header.cellIndex].innerText > b.children[header.cellIndex].innerText) { return  direction; }
        return 0;
      })

      tbody.innerHTML = ''
      rows.forEach((row, i) => {
        tbody.appendChild(row)
      });
    }
  })
}
