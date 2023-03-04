import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Create styles
const PdfProfile = ({
  profile
}) => (
  <Document>
    <Page style={styles.body}>
      <Image src={profile.profileImage} style={styles.image} />
      {Object.entries(profile).map(([key, value]) => {
        if (key === "profileImage" || key === "status" || key === "id" || key === "created_at" || key === "update_at" || key === "created_by") {
          return null;
        } else {
          return (
            <Text key={key}>
              <Text style={styles.title}>
                {{
                  name: "Nome",
                  surname: "Sobrenome",
                  genre: "Gênero",
                  address: "Endereço",
                  email: "Email",
                  phone: "Telefone",
                  birthDate: "Data de Nascimento",
                  role: "Cargo",
                  admissionDate: "Data de Admissão",
                  nacionality: "Nacionalidade",
                  sector: "Setor",
                  salary: "Salário",
                }[key] || key}:
              </Text>
              {value.toString()}
            </Text>
          );
        }
      })}
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Times-Roman'

  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    width: 100,
    height: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});


export default PdfProfile;