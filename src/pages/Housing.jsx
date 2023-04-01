import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
// données des logements et des hôtes
import data from '../data/data.json'
// composants
import Header from '../components/header/Header'
import Carousel from '../components/outils/Carousel'
import Collapse from '../components/outils/Collapse'
import Footer from '../components/Footer'
// images
import greyStar from '../assets/grey_star.png'
import redStar from '../assets/red_star.png'
// styles
import '../styles/housing/Housing.css'

function Housing() {
  // 	Déclaration d’une variable d’état en lui donnant une valeur initiale, ici un tableau vide
  const [slides, setSlides] = useState([])
  // Extraction de l'id de l'url
  const houseId = useParams('id').id
  // On filtre le logement à afficher avec son id
  const dataCurrentHouse = data.filter((data) => data.id === houseId)
  // Met à jour slides que lorsque l'id du logement change
  useEffect(() => {
    // récupération des données du logement acuel par rapport à son id
    const dataCurrentHouse = data.filter((data) => data.id === houseId)
    setSlides(dataCurrentHouse[0].pictures)
  }, [houseId])
  // On extrait les données de l'hôte et du logement  et on les stocke
  const name = dataCurrentHouse[0].host.name.split(' ')
  const rating = dataCurrentHouse[0].rating
  const description = dataCurrentHouse[0].description
  const equipments = dataCurrentHouse[0].equipments

  return (
    <>
      <Header />
      <main className="housing">
        <Carousel slides={slides} />
        <section className="housing_content">
          <div className="housing_info">
            <h1>{dataCurrentHouse[0].title}</h1>
            <p>{dataCurrentHouse[0].location}</p>
            <div>
              {dataCurrentHouse[0].tags.map((tag, index) => {
                return <button key={index}>{tag}</button>
              })}
            </div>
          </div>
          <div className="housing_host">
            <div className="housing_host_name">
              <div className="host_name">
                <span>{name[0]}</span>
                <span>{name[1]}</span>
              </div>
              <img
                className="host_picture"
                src={dataCurrentHouse[0].host.picture}
                alt="hôte du logement"
              />
            </div>

            <div className="host_stars">
              {(() => {
                const stars = []
                for (let i = 1; i <= 5; i++) {
                  stars.push(
                    <img
                      key={i}
                      src={i <= rating ? redStar : greyStar}
                      alt="star"
                    />
                  )
                }
                return stars
              })()}
            </div>
          </div>
        </section>
        <section className="housing_collapse">
          <div className="collapse_item">
            <Collapse title={'Description'} content={description} />
          </div>
          <div className="collapse_item">
            <Collapse title={'Équipements'} content={equipments} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Housing
