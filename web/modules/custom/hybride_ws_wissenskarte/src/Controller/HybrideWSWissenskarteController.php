<?php
/**
 * Created by PhpStorm.
 * User: julien
 * Date: 26.08.19
 * Time: 11:03
 */

namespace Drupal\hybride_ws_wissenskarte\Controller;


use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class HybrideWSWissenskarteController extends ControllerBase
{

    public function showKnowledgeMapOld() {
        global $base_url;
        $render_html = [
            '#type' => 'markup',
            '#markup' => '<h3>Wissenskarte</h3><div id="visualization"></div>',
        ];
        $render_html['#attached']['library'][] = 'hybride_ws_wissenskarte/hexagon';
        $render_html['#attached']['drupalSettings']['baseUrl'] = $base_url;
        /*
        return [
            '#theme' => 'dt_procedure',
        ];
        */
        return $render_html;
    }

  /**
   * @return array  Returns a basic container to hold the knowledge map and
   *                attached JS/CSS files to build the knowdlege map.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityMalformedException
   */
  public function showKnowledgeMap() {
    global $base_url;
    $render_html = [
      '#type' => 'markup',
      '#markup' => '<h3>Wissenskarte</h3><div id="visualization"></div>',
    ];
    $render_html['#attached']['library'][] = 'hybride_ws_wissenskarte/hexagon';
    $render_html['#attached']['drupalSettings']['baseUrl'] = $base_url;

    // all other colors are defined in Drupal (discipline taxonomy terms)
    $hexColors = ['Smart Hybrid' => "#0095eb",
                  'defautgrey' => "#e3e3e3"];


    // store hex data as JSON file
    $hexJson = array(
      'layout' => 'even-r',
      'hexes' => array()
    );

    // set center hex 'Smart Hybrid'
    $center = ['name' => 'Smart Hybrid', 'q' => 0, 'w' => 0];
    $hexJson['hexes'][$center['name']] = array(
      'type' => 'center',
      'name' => $center['name'],
      'q' => $center['q'],
      'r' => $center['w'],
      'id' => 'center',
      'color' => $hexColors[$center['name']]
    );

    // Set coordinate offsets for hex cluster generation. Clusters are build
    // up from the center hex outwards.
    $evenRow = [
      array(0,0),
      array(1,0),
      array(0,1),
      array(-1,1),
      array(-1,0),
      array(-1,-1),
      array(0,-1),
      array(2,0),
      array(1,1),
      array(1,2),
      array(0,2),
      array(-1,2),
      array(2,1),
      array(-2,0),
      array(2,-1),
      array(-1,-2),
      array(0,-2),
      array(1,-2),
      array(1,-1)];

    $oddRow = [
      array(0,0),
      array(1,0),
      array(1,1),
      array(0,1),
      array(-1,0),
      array(0,-1),
      array(1,-1),
      array(2,0),
      array(2,1),
      array(1,2),
      array(0,2),
      array(-1,2),
      array(-1,1),
      array(-2,0),
      array(-1,-1),
      array(-1,-2),
      array(0,-2),
      array(1,-2),
      array(2,-1),];

    // Set centers for the discipline's method clusters.
    $methodCenters = [[3,0],
      [1,3],
      [-2,3],
      [-3,0],
      [-2,-4],
      [2,-4]];

    $vocabularyTerms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree('disziplinen');

    foreach ($vocabularyTerms as $termIndex => $term) {
      $termName = $term->name;
      $tid = $term->tid;
      $color = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($tid)->get('field_color')->color;

      // build discipline hexes
      $hexJson['hexes'][$termName] = array(
        'type' => 'discipline',
        'name' => $termName,
        'q' => 0 + $evenRow[$termIndex+1][0],
        'r' => 0 + $evenRow[$termIndex+1][1],
        'tid' => $tid,
        'color' => $color,
      );

      // depending on the row the hex is on the neighboring
      // hex coordinates differ.
      $clusterOrder = $oddRow;
      if ($methodCenters[$termIndex][1] % 2 === 0) {
        $clusterOrder = $evenRow;
      }

      // build discipline's method clusters
      $methods = $this->_get_nodes_by_term($tid);
      $methodIndex = -1;

      foreach ($methods as $method) {
        ++$methodIndex;
        $methodName = $method->getTitle();
        $methodUrl = $method->toUrl()->toString();

        $hexJson['hexes'][] = array(
          'type' => 'method',
          'name' => $methodName,
          'q' => $methodCenters[$termIndex][0] + $clusterOrder[$methodIndex][0],
          'r' => $methodCenters[$termIndex][1] + $clusterOrder[$methodIndex][1],
          'color' => $color,
          'groupid' => $tid,
          'url' => $methodUrl
        );
        
      }
    }

    $render_html['#attached']['drupalSettings']['hybride_ws_wissenskarte']['hexJson'] = $hexJson;
    return $render_html;
  }

    public function test() {
        $nodes = $this->_get_nodes_by_term(12);


        return ['#markup' => 'Test'];
    }

    public function display_projects($term_id) {
        global $base_url;
        $nodes = $this->_get_nodes_by_term($term_id);
	//dsm($nodes);
        foreach ($nodes as $node) {
            $model_name = $node->get('title')->value;
            $node_id = $node->id();
            $path = $base_url . '/node/' . $node_id;
            $list[] = '<li>' . '<a href="' . $path . '">' . $model_name . '</a></li>';
          }
          //Build an unordered list
          $list_start_item = "<ul>";
          foreach ($list as $list_item) {
            $list_start_item .= $list_item;
          }
          $list_start_item .= "</ul>";

          return new JsonResponse($list_start_item);

    }



    public function getTermIdByTermName($termName){
        $connection = \Drupal::database();
        $result = $connection->query('SELECT tid FROM {taxonomy_term_field_data}
                                            WHERE name = :name', [':name' => $termName])
                              ->fetchAll();
        $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')
          ->loadByProperties(['name' => $termName]);
        $tid = $result[0]->tid;
        return $tid;
    }

    function _get_nodes_by_term($term_id) {

        //$query = \Drupal::database()->select('taxonomy_index', 'ti');
        //$query->fields('ti', ['nid']);
        //$query->condition('ti.tid', $term_id);
        //$nodes = $query->execute()->fetchAssoc();

	$nodes = \Drupal::entityTypeManager()->getStorage('node')->loadByProperties(['field_disziplinen' => $term_id]);
	//dsm($nodes);
        foreach($nodes as $nid => $node) {
            $nids[] = $nid;
        }

        $nodes = \Drupal\node\Entity\Node::loadMultiple($nids);
        if(!is_null($nids)) {
            return $nodes;
        } else {
            \Drupal::messenger()->addMessage('Fehler im HbridWSController');
        }

    }



}
