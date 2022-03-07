import db from '../firebase/db';

export default class AttractionRepository {

    static collection = db.collection('haviAdatok');

    static async getAll() {
        return AttractionRepository.collection
            .orderBy('rogzites', 'desc')
            .get()
            .then((ref) => {
                const rezsiAdatok = [];

                ref.docs.forEach(doc => {
                    rezsiAdatok.push({ id: doc.id, ...doc.data() });
                });

                return rezsiAdatok;
            });
    }

    // static getDistinctSettlements() {
    //     return AttractionRepository.collection
    //         .orderBy('settlement', 'asc')
    //         .get()
    //         .then((ref) => {
    //             const settlements = new Set();

    //             ref.docs.forEach(doc => {
    //                 const attraction = doc.data();
    //                 settlements.add(attraction.settlement);
    //             });

    //             return Array.from(settlements);
    //         });
    // }

    // static getAllBySettlement(settlement) {
    //     return AttractionRepository.collection
    //         .where('settlement', '==', settlement)
    //         // .orderBy('name', 'asc')
    //         .get()
    //         .then((ref) => {
    //             const attractions = [];

    //             ref.docs.forEach(doc => {
    //                 attractions.push({ id: doc.id, ...doc.data() });
    //             });

    //             //  Either add firestore index to be able to select and order by 2 different fields,
    //             //  Or sort the documents in JS
    //             attractions.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

    //             return attractions;
    //         });
    // }

    static insert(rezsiAdat) {
        return AttractionRepository.collection
            .add(rezsiAdat);
    }

    static update(id, rezsiAdat) {
        return AttractionRepository.collection
            .doc(id)
            .set(rezsiAdat);
    }

    static remove(id) {
        return AttractionRepository.collection
            .doc(id)
            .delete();
    }
}