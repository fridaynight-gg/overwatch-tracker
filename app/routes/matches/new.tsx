export default function NewMatch() {
  return (
    <div>
      <p>Enter new match details</p>
      <form method="post">
        <div>
          <label htmlFor="map">Map: </label>
          <select name="map" id="map">
            <option value="dorado">Dorado</option>
            <option value="hanamura">Hanamura</option>
            <option value="horizon">Horizon Lunar Colony</option>
            <option value="junkertown">Junkertown</option>
            <option value="kings-row">King's Row</option>
            <option value="lijiang">Lijiang Tower</option>
            <option value="nepal">Nepal</option>
            <option value="numbani">Numbani</option>
            <option value="oasis">Oasis</option>
            <option value="rialto">Rialto</option>
            <option value="route-66">Route 66</option>
            <option value="temple-of-anubis">Temple of Anubis</option>
            <option value="volskaya">Volskaya Industries</option>
            <option value="watchpoint">Watchpoint: Gibraltar</option>
            <option value="blizzard-world">Blizzard World</option>
            <option value="eichenwalde">Eichenwalde</option>
            <option value="hollywood">Hollywood</option>
            <option value="ilios">Ilios</option>
            <option value="busan">Busan</option>
            <option value="ecopoint">Ecopoint: Antarctica</option>
          </select>
        </div>
        <div>
          <p>
            Mode:
            <input
              type="radio"
              id="quickplay"
              name="gamemode"
              value="Quickplay"
            />
            <label htmlFor="quickplay">Quickplay</label>
            <input
              type="radio"
              id="competitive"
              name="gamemode"
              value="Competitive"
            />
            <label htmlFor="competitive">Competitive</label>
          </p>
        </div>
        <div>
          <p>
            Result:
            <input type="radio" id="win" name="result" value="Win" />
            <label htmlFor="win">Win</label>
            <input type="radio" id="loss" name="result" value="Loss" />
            <label htmlFor="loss">Loss</label>
            <input type="radio" id="draw" name="result" value="Draw" />
            <label htmlFor="draw">Draw</label>
          </p>
        </div>
        <div>
          <p>
            <label htmlFor="players">
              Players: <input type="text" name="players" id="players" />
            </label>
          </p>
        </div>
        <div>
          <p>
            <label htmlFor="role">Role: </label>
            <select name="role" id="role">
              <option value="tank">Tank</option>
              <option value="damage">Damage</option>
              <option value="support">Support</option>
            </select>
          </p>
        </div>
        <div>
          <p>
            <label htmlFor="hero">Hero: </label>
            <select name="hero" id="hero">
              <option value="ana">Ana</option>
              <option value="ashe">Ashe</option>
              <option value="baptiste">Baptiste</option>
              <option value="bastion">Bastion</option>
              <option value="brigitte">Brigitte</option>
              <option value="dva">D.Va</option>
              <option value="doomfist">Doomfist</option>
              <option value="echo">Echo</option>
              <option value="genji">Genji</option>
              <option value="hanzo">Hanzo</option>
              <option value="junkrat">Junkrat</option>
              <option value="kiriko">Kiriko</option>
              <option value="lucio">Lúcio</option>
              <option value="cassidy">Cassidy</option>
              <option value="mei">Mei</option>
              <option value="mercy">Mercy</option>
              <option value="moira">Moira</option>
              <option value="orisa">Orisa</option>
              <option value="pharah">Pharah</option>
              <option value="ramattra">Ramattra</option>
              <option value="reaper">Reaper</option>
              <option value="reinhardt">Reinhardt</option>
              <option value="roadhog">Roadhog</option>
              <option value="sigma">Sigma</option>
              <option value="soldier-76">Soldier: 76</option>
              <option value="sombra">Sombra</option>
              <option value="soujourn">Sóujourn</option>
              <option value="symmetra">Symmetra</option>
              <option value="torbjorn">Torbjörn</option>
              <option value="tracer">Tracer</option>
              <option value="widowmaker">Widowmaker</option>
              <option value="winston">Winston</option>
              <option value="wrecking-ball">Wrecking Ball</option>
              <option value="zarya">Zarya</option>
              <option value="zenyatta">Zenyatta</option>
            </select>
          </p>
        </div>
        <div>
          <p>
            <label htmlFor="date">Date Played: </label>
            <input type="date" name="date" id="date" />
          </p>
        </div>
        <div>
          <label htmlFor="vibe">
            Player vibe: <input type="range" name="vibe" min="1" max="10" />
          </label>
        </div>
        <div>
          <label>
            Comments: <textarea name="content" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
